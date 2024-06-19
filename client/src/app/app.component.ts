import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssueService } from './issue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly issueService: IssueService) {}
  sub1!: Subscription;

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  createIssue() {
    const issue = this.form.value;
    this.sub1 = this.issueService.createIssue(issue).subscribe();
  }
}
