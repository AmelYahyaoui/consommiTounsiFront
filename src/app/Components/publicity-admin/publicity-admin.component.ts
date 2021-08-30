import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../Services/Publicity/publicity.service';
import { Publicity } from '../../Models/Publicity';
import { NgForm,FormBuilder,FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-publicity-admin',
  templateUrl: './publicity-admin.component.html',
  styleUrls: ['./publicity-admin.component.css'],
})
export class PublicityAdminComponent implements OnInit {
  publicities: Array<Publicity>;
  contactForm: FormGroup;
  cibles: any;
  channels: any;
  file: File;
  numberInitialViews:any;
  constructor(private publicityService: AdsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.channels = ['Facebook', 'twitter', 'Instagram', 'google adds'];
    this.cibles = ["Enfants","Homme","Femme"]
    this.numberInitialViews = ["200","500","1000"]
    this.contactForm = this.fb.group({
      channelPublicity: [null],
      namePublicity: [null],
      targetPublicity:[null],
      initialViewNumber:[null],
      startDatePublicity:[null],
      endDatePublicity:[null],
      mailOwnerPublicity:[null],
      phoneOwnerPublicity:[null],
      fileName:[null]
      
    });
    this.publicityService.getAllPublicities().subscribe(
      (res) => {
        this.publicities = res;
        console.log(this.publicities);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //add publicity
  submit() {
    console.log(this.contactForm.value);
  }

  //delete publicity
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  deletePublicity(publicity) {
    Swal.fire({
      icon: 'warning',
      title: 'Supprimer cette publicité',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, Supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicityService
          .deletePublicity(publicity.idPublicity)
          .subscribe(() =>
            this.publicityService.getAllPublicities().subscribe((res) => {
              this.publicities = res;
            })
          );
      } else if (result.isDismissed) {
        this.swalWithBootstrapButtons.fire(
          'Annulé',
          'Opération annulée',
          'error'
        );
      }
    });
  }
}
