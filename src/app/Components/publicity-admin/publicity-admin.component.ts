import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../Services/Publicity/publicity.service';
import { Publicity } from '../../Models/Publicity';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-publicity-admin',
  templateUrl: './publicity-admin.component.html',
  styleUrls: ['./publicity-admin.component.css'],
})
export class PublicityAdminComponent implements OnInit {
  publicities: Array<Publicity>;
  contactForm: FormGroup;
  contactForm1: FormGroup;
  cibles: any;
  channels: any;
  file: File;
  numberInitialViews: any;
  typesPublicity: any;
  showModel: Boolean;
  edit: Boolean;
  constructor(private publicityService: AdsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.channels = ['Facebook', 'twitter', 'Instagram', 'google adds'];
    this.cibles = ['Enfants', 'Homme', 'Femme'];
    this.numberInitialViews = [200, 500, 1000];
    this.typesPublicity = ['image', 'video'];
    this.showModel = false;
    this.contactForm = this.fb.group({
      channelPublicity: [null],
      namePublicity: [null],
      targetPublicity: [null],
      initialViewNumber: [null],
      startDatePublicity: [null],
      endDatePublicity: [null],
      mailOwnerPublicity: [null],
      phoneOwnerPublicity: [null],
      fileName: [null],
      typePublicity: [null],
      descriptionPublicity: [null],
    });
    this.edit = false;
    this.contactForm1 = this.fb.group({
      channelPublicity: [null],
      namePublicity: [null],
      targetPublicity: [null],
      initialViewNumber: [null],
      startDatePublicity: [null],
      endDatePublicity: [null],
      mailOwnerPublicity: [null],
      phoneOwnerPublicity: [null],
      fileName: [null],
      typePublicity: [null],
      descriptionPublicity: [null],
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

  resetForm() {
    this.contactForm = this.fb.group({
      channelPublicity: [null],
      namePublicity: [null],
      targetPublicity: [null],
      initialViewNumber: [null],
      startDatePublicity: [null],
      endDatePublicity: [null],
      mailOwnerPublicity: [null],
      phoneOwnerPublicity: [null],
      fileName: [null],
      typePublicity: [null],
      descriptionPublicity: [null],
    });
  }

  //add publicity
  submit() {
    if (this.contactForm.value.fileName) {
      var startIndex =
        this.contactForm.value.fileName.indexOf('\\') >= 0
          ? this.contactForm.value.fileName.lastIndexOf('\\')
          : this.contactForm.value.fileName.lastIndexOf('/');
      var filename = this.contactForm.value.fileName.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      this.contactForm.value.fileName = filename;
    }
    this.publicityService
      .addPublicity(this.contactForm.value)
      .subscribe((res) => {
        console.log(res);
        this.resetForm();
        this.showModel = false;
        this.publicityService.getAllPublicities().subscribe((res) => {
          this.publicities = res;
        });
      });
  }

  toggelModel() {
    this.showModel = true;
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
          'Annuler',
          'Opération Annulere',
          'error'
        );
      }
    });
  }
  //editPublicité
  editPublicity(pub) {
    this.edit = true;
    this.publicityService.getPublicityById(pub.idPublicity).subscribe((res) => {
      this.contactForm1.value.channelPublicity = pub.channelPublicity;
      this.contactForm1.value.namePublicity = pub.channelPublicity;
      this.contactForm1.value.initialViewNumber = pub.initialViewNumber;
      this.contactForm1.value.startDatePublicity = res.startDatePublicity;
      this.contactForm1.value.endDatePublicity = res.endDatePublicity;
      this.contactForm1.value.mailOwnerPublicity = res.mailOwnerPublicity;
      this.contactForm1.value.phoneOwnerPublicity = res.phoneOwnerPublicity;
      this.contactForm1.value.typePublicity = pub.typePublicity;
      this.contactForm1.value.descriptionPublicity = res.descriptionPublicity;
      this.contactForm1.value.targetPublicity = pub.targetPublicity;
      this.contactForm1.value.fileName = res.fileName;

      console.log('form1', this.contactForm1);
    });
  }
}
