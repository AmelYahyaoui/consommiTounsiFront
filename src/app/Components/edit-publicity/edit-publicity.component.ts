import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../../Services/Publicity/publicity.service';
import { Publicity } from '../../Models/Publicity';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-publicity',
  templateUrl: './edit-publicity.component.html',
  styleUrls: ['./edit-publicity.component.css'],
})
export class EditPublicityComponent implements OnInit {
  @Input() id?: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  contactForm: FormGroup;
  cibles: any;
  channels: any;
  file: File;
  numberInitialViews: any;
  typesPublicity: any;
  publicity: Publicity;
  codeForm: NgForm;
  options: any;
  value: Boolean;

  constructor(
    private router: Router,
    private publicityService: AdsService,
    private fb: FormBuilder
  ) {
    router.events.subscribe(() => {
      this.publicityService
        .getPublicityById(Number(this.router.url.slice(21)))
        .subscribe(
          (res) => {
            this.publicity = res;
            console.log(this.publicity);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  ngOnInit(): void {
    console.log(this.router.url.slice(21));
    this.channels = ['Facebook', 'twitter', 'Instagram', 'google adds'];
    this.cibles = ['Enfants', 'Homme', 'Femme'];
    this.numberInitialViews = [200, 500, 1000];
    this.typesPublicity = ['image', 'video'];
    this.options = [true, false];
    this.publicityService
      .getPublicityById(Number(this.router.url.slice(21)))
      .subscribe(
        (res) => {
          this.publicity = res;
        },
        (err) => {
          console.log(err);
        }
      );
    console.log('fhfhfhfhfh', this.publicity);
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
  setValue(value) {
    this.value = value;
    this.onChange.emit({ id: this.id, value: this.value });
  }
  editPublicity() {
    /**  if (this.codeForm.value.fileName) {
      var startIndex =
        this.codeForm.value.fileName.indexOf('\\') >= 0
          ? this.codeForm.value.fileName.lastIndexOf('\\')
          : this.codeForm.value.fileName.lastIndexOf('/');
      var filename = this.codeForm.value.fileName.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      this.codeForm.value.fileName = filename;
    }*/
    console.log('ediiiiittttttt', this.publicity);
    this.publicityService
      .updatePublicity(this.publicity.idPublicity, this.publicity)
      .subscribe((resp) => {
        console.log('after', resp);
        this.publicity = null;
        this.router.navigate(['/home/ads']);
      });
  }

  redirectPub() {
    this.router.navigate(['/home/ads']);
  }
}
