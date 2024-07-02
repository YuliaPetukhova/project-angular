import {Component, OnDestroy, OnInit} from "@angular/core";
import {AlertService} from "../../../services/alert.service";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [
    NgIf
  ]
})

export class AlertComponent implements OnInit, OnDestroy {
  alertError: string | null;
  alertSuccess: string | null;
  private errorSubscription?: Subscription;
  private successSubscription?: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.errorSubscription = this.alertService.error$.subscribe(data => {
      this.alertError = data;
    });

    this.successSubscription = this.alertService.success$.subscribe(data => {
      this.alertSuccess = data;
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
    this.successSubscription?.unsubscribe();
  }
}
