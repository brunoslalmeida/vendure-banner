import {
  Input,
  Output,
  OnInit,
  OnDestroy,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  Asset,
  SharedModule,
  ModalService,
  AssetPickerDialogComponent,
} from '@vendure/admin-ui/core';
import { getImageUrl } from '../';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'image-picker-list',
  templateUrl: './image-picker-list.component.html',
  styleUrls: ['./image-picker-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule, CommonModule],
})
export class ImagePickerListComponent implements OnInit, OnDestroy {
  @Output() asset = new EventEmitter<Asset[]>();
  @Input() assets: Asset[];
  @Input() onHttpRequest: false;
  @Input() multiselect: true;
  @Input() invalid?: boolean;
  @Input() clear?: EventEmitter<void>;

  subscription: Subscription | undefined;

  constructor(private modalService: ModalService) {}

  ngOnDestroy(): void {
    this.clear?.unsubscribe();
  }

  ngOnInit(): void {
    this.clear?.subscribe(() => {
      this.assets = [];
    });

    this.invalid = this.invalid ?? false;
  }

  protected getImageUrl(image: Asset, preset: string) {
    return getImageUrl(image, preset);
  }

  remove(index: number) {
    this.assets = this.assets.filter((e, i) => i !== index);
    this.asset.emit(this.assets);
  }

  selectAssets() {
    this.modalService
      .fromComponent(AssetPickerDialogComponent, {
        size: 'xl',
        locals: {
          selection: this.assets,
          multiSelect: this.multiselect,
        },
      })
      .subscribe(result => {
        if (result && result.length) {
          this.assets = result;
          this.asset.emit(this.assets);
        }
      });
  }
}
