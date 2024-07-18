import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { ObjectService } from 'src/app/services/object.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { IHeroSlider } from 'src/app/shared/types/hero-slider-t';
import { HeroSliderData } from 'src/app/shared/data/hero-slider-data';
import { Router } from '@angular/router';
import { Object } from 'src/app/models/object.model';

@Component({
  selector: 'app-home-one',
  templateUrl: './homeFO.component.html',
  styleUrls: ['./homeFO.component.scss']
})

export class HomeFOComponent {
  public objects: Object[] = [];
  @ViewChild('heroSliderContainer') heroSliderContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public hero_slider_data: IHeroSlider[] = HeroSliderData.hero_slider_one;
  public trendingProducts: IProduct[] = [];
  loading = false;
  public pageNo: number = 1;
  public pageSize: number = 20;

  constructor(
    private productService: ProductService,
    private objectService : ObjectService,
    private router : Router
  ) {
    this.productService.products.subscribe((products) => {
      this.trendingProducts = products.filter((p) => p.trending);
    });
  }

  ngOnInit() : void {
    this.loadObjects();
  }

  loadObjects(): void {
    this.loading = true;
    const filters = {
      name: "",
      description:"",
      category_id: "",
      created_at_start: "",
      created_at_end: ""
    };

    this.objectService.getObjects(this.pageNo,this.pageSize, "", filters).subscribe(data => {
      this.objects = data.objects;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error('Error loading objects', error);
    });
  }

  voirPlus() {
    this.router.navigate(['/object/search']);
  }
}
