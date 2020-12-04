import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page/main-page.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private pageService:  MainPageService, private modalService: NzModalService) { }

  basketIds: Array<any>= [];
  books: Array<any>;

  ngOnInit(): void {
    this.initPage();
  }

  showConfirm(id): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you shure to delete from basket?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () =>{
        this.delBook(id)
      }
    });
  }

  delBook(id){
    let user =JSON.parse(localStorage.getItem('user'))
    this.pageService.delBasket(user['id'] ,id).subscribe( () =>{
      this.initPage()
    });
  }

  initPage(){
    this.books =[];
    this.basketIds = [];
    let user =JSON.parse(localStorage.getItem('user'))
    this.pageService.getBasket(user['id']).subscribe(res => {
      this.basketIds = res['0'];
      this.basketIds.forEach( val =>{
        this.pageService.getBook(val['AMAZON_INDEX']).subscribe( result =>{
          this.books.push(result['books'])
        });
      });
      console.log(this.books);

    });
  }
}
