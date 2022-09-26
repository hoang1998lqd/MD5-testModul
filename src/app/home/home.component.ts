import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import {Province} from "../model/province";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProvinceService} from "../service/province.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titleDetail?: string
  priceDetail?: number
  idDetail?: number
  descriptionDetail?: string
  provinces: Province[] = []
  idp?: number
  provinceForm!: FormGroup;

  provinceDetail?: Province

  constructor(private provinceService: ProvinceService,
              private formGroup: FormBuilder) {

  }

  ngOnInit(): void {
    this.displayProvinces()
    this.provinceForm = this.formGroup.group({
      id: [''],
      title: [''],
      price: [''],
      description: [''],
    })
  }

  displayProvinces() {
    this.provinceService.findAllProvinces().subscribe(value => {
      this.provinces = value;
      console.log(this.provinces[1].title)
    })
  }

  displayFormCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "block";
    // @ts-ignore
    this.setUpFormCreate()

    // $('#myModal').modal('show');
  }

  setUpFormCreate() {
    // @ts-ignore
    document.getElementById("title").value = ""
    // @ts-ignore
    document.getElementById("price").value = ""
    // @ts-ignore
    document.getElementById("description").value = ""
    // @ts-ignore
    document.getElementById("titleFrom").innerHTML = "Tạo mới thành phố";
    // @ts-ignore
    document.getElementById("buttonCreate")!.hidden = false
    // @ts-ignore
    document.getElementById("buttonUpdate")!.hidden = true


  }

  setUpFormUpdate(province: Province) {
    this.provinceForm.patchValue(province)
    // @ts-ignore
    document.getElementById("titleFrom").innerHTML = "Chỉnh sửa thành phố";
    // @ts-ignore
    document.getElementById("buttonCreate")!.hidden = true
    // @ts-ignore
    document.getElementById("buttonUpdate")!.hidden = false
    // @ts-ignore
    document.getElementById("myModal").style.display = "block"
    // $('#myModal').modal('show');
  }

  closeFromCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "none";
    // $('#myModal').modal('show');
  }

  createProvince() {
    let province = {
      id: this.provinceForm.value.id,
      title: this.provinceForm.value.title,
      price: this.provinceForm.value.price,
      description: this.provinceForm.value.description,
    }
    this.provinceService.createProvince(province).subscribe(value => {
      this.createSuccess()
      // @ts-ignore
      document.getElementById("myModal").style.display = "none"
      // $('#myModal').modal('show');
      this.displayProvinces()
      console.log(value)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tạo mới thất bại',
        showConfirmButton: false,
        timer: 1500
      })
    })
    // @ts-ignore
    document.getElementById("rest").click()
  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tạo mới thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }

  updateForm(id?: number) {
    this.idp = id;
    this.provinceService.getProvinceById(this.idp).subscribe(value => {
      this.setUpFormUpdate(value)
    })
  }

  updateProvince(){
    let province = {
      id: this.idp,
      title: this.provinceForm.value.title,
      price: this.provinceForm.value.price,
      description: this.provinceForm.value.description,
    }

    Swal.fire({
      title: 'Bản có chắc chắn muốn chỉnh sửa?',
      showDenyButton: true,
      confirmButtonText: 'Chỉnh sửa',
      denyButtonText: `Hủy`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.provinceService.updateProvince(this.idp ,province).subscribe(value => {
          this.setUpFormUpdate(value)
          // @ts-ignore
          document.getElementById("myModal").style.display = "none"
          this.displayProvinces()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Chỉnh sửa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire('Chỉnh sửa thành công!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Hủy bỏ!', '', 'info')
      }
    })

  }

  deleteProvince(id?: number){
    this.idp = id
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Dữ liệu sẽ không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.provinceService.deleteProvince(id).subscribe(value => {
          this.displayProvinces()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xóa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire(
          'Xóa thành công!',
          'Dữ liệu đã bị xóa bỏ',
          'success'
        )
      }
    })
  }


  displayDetail(id?: number){
    this.idDetail = id
    for (let i = 0; i < this.provinces.length; i++) {
      if (id == this.provinces[i].id){
        this.provinceDetail = this.provinces[i]
        console.log(this.provinceDetail)
        this.titleDetail = this.provinceDetail.title;
        this.priceDetail = this.provinceDetail.price;
        this.descriptionDetail = this.provinceDetail.description;

      }

    }


  }

  closeDetail(){
    // @ts-ignore
    document.getElementById("table").style.display = "none"
  }
}
