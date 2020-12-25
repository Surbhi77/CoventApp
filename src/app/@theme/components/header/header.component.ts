import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { NbMediaBreakpointsService,NB_WINDOW, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import {ApiService} from  './../../../services/api.service';
import {environment} from 'environments/environment'
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;
  assetBasePath:any=environment.imageUrl
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'material-light';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  profilePic:any='';

  public constructor(
    private router: Router,
    private apiService:ApiService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    @Inject(NB_WINDOW) private window,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.user = JSON.parse(localStorage.getItem('userData')).user_name;
    
    this.profilePic = this.assetBasePath+JSON.parse(localStorage.getItem('userData')).image;
    this.apiService.userDataUpdated$.subscribe(res=>{
      console.log(res)
      if(res.image!='' && res.image!=null){
        this.profilePic = this.assetBasePath+res.image
        let userDetails = JSON.parse(localStorage.getItem('userData'));
        userDetails.image = res.image;
        localStorage.setItem("userData",JSON.stringify(userDetails))
      }
      if(res.user_name){
        let userDetails = JSON.parse(localStorage.getItem('userData'));
        userDetails.user_name = res.user_name;
        this.user = res.user_name
        localStorage.setItem("userData",JSON.stringify(userDetails))
      }
      //if(res.user_name)
    })
      
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title =>{
        console.log(title);
        if(title == 'Log out'){
          localStorage.clear();
          this.apiService.userLoggedOutorIn$.next(0)
          this.router.navigateByUrl('/auth/login');
        }
        if(title == 'Profile'){
          // localStorage.clear();
          // this.apiService.userLoggedOutorIn$.next(0)
          this.router.navigateByUrl('/pages/forms/inputs');
        }
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
