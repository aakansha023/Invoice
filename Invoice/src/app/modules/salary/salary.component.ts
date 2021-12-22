import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControlName, Validator, Form, FormArray} from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  InvoiceForm:FormGroup;
  slipview:boolean = false;
  InvoiceFormData:any = [];
  Itemarray:any = [];
  Date = new Date();
  totalprice:number= 0;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route:Router,
    private _formBuilder:FormBuilder,
  ) {
    
    this.InvoiceForm = this._formBuilder.group({
      SellerName:[''], 
      SellerPhone:[''], 
      SellerAddress:[''],
      BuyerName:[''], 
      BuyerPhone:[''], 
      BuyerAddress:[''],
      items: this._formBuilder.array([]) ,
    })


   }

  ngOnInit(): void {

  }

  get items() : FormArray {
    return this.InvoiceForm.get("items") as FormArray
  }
 
  newItem(): FormGroup {
    return this._formBuilder.group({
      name: '',
      price: '',
      quantity: '',
      tax: '',
      amount: ''
    })
  }
 
  addItem() {
    this.items.push(this.newItem());
  }
 
  removeItem(i:number) {
    this.items.removeAt(i);
  }


  public downloadSal() {        
    let DATA = document.getElementById('Slip')!;
    html2canvas(DATA).then(canvas => {
        
      let fileWidth = 190;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4' );
      let x = 10;
      let y = 10;
        PDF.addImage(FILEURI, 'PNG', x, y, fileWidth, fileHeight)
        PDF.save('Invoice.pdf');
  });   
  }

  

  onSubmit(){
    this.slipview = true;

    this.InvoiceFormData = this.InvoiceForm.value;

    for (let i = 0; i < this.InvoiceForm.value.items.length; i++) {
      let sum = (this.InvoiceFormData.items[i].price + this.InvoiceFormData.items[i].tax) *  this.InvoiceFormData.items[i].quantity;
      this.InvoiceFormData.items[i].amount = sum;

      this.totalprice = this.totalprice + sum;
    }

  }

  

 

}
