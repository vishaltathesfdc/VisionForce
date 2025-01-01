import { LightningElement } from 'lwc';
const BOOK_URL ="https://www.googleapis.com/books/v1/volumes?q="
export default class BookApp extends LightningElement {
    query='Man';
    booksData=[]
    timer

    fetchBooksHandler(event){
        this.query=event.target.value
        window.clearTimeout(this.timer)
        this.timer =setTimeout(()=>{
            this.fetchBookData()
        },1000)
    }


    connectedCallback(){
        this.fetchBookData();
    }

    fetchBookData(){
        fetch(BOOK_URL+this.query).then((response)=>response.json()).then((result)=>{
            console.log("map----",result)
            this.booksData =this.formattData(result)
        })


    }

    FetchHandle(){

        this.booksData=[]
        this.fetchBookData().then((response)=>{
            console.log("response---",response)
        }).catch((error)=>{
            console.error("error---",error)
        })
    }

    formattData(data){
        return data?.items?.map((item)=>{
            return console.log("item----",item)
        })
    }

    formattData(data){
        return data?.items?.map((item)=>{
            return {
                id:item.id,
                thumbnail:item.volumeInfo.imageLinks && (item.volumeInfo.imageLinks.smallThumbnail || item.volumeInfo.imageLinks.thumbnail),
                title:item.volumeInfo.title,
                publishedDate:item.volumeInfo.publishedDate,
                averageRating:item.volumeInfo.averageRating||"NA"
            }
        })
    }
}