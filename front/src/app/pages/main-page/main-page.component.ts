import { Component, OnInit } from '@angular/core';
import { MainPageService } from './main-page.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  books: Array<any> =[];
  selected = null;
  page_tag = "list";
  groupPages: Array<any> = [];
  page: number = 1;
	pageLen: number;



  constructor(private mainService: MainPageService,private router: Router) { }

  ngOnInit(): void {
    this.changePage()
  }

  onLogOut(){
    localStorage.removeItem('user');
    this.router.navigate(['./login'])
  }

  changePage(){

      this.mainService.getBooks().subscribe( resp => {
        this.books = resp['books'];
        this.pageLen = this.books.length;
        this.groupPages = this.divideArr(20, this.books)
      });

  }

  change_tag(id){
    if(id == 0){
      this.page_tag = "list"
    }
    else{
      this.page_tag = "basket"
    }
  }

  divideArr(len: number, arr: Array<any>) {
		let newArray = new Array(Math.ceil(arr.length / len))
			.fill('')
			.map(function () {
				return this.splice(0, len);
			}, arr.slice());

		return newArray;
  }

  insToBasket(book){
    let user =JSON.parse(localStorage.getItem('user'))
    this.mainService.insBasket(user['id'] ,book['AMAZON_INDEX']).subscribe();
  }

}
