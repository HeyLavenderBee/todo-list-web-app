import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginScreen } from './user-login-screen';

describe('UserLoginScreen', () => {
  let component: UserLoginScreen;
  let fixture: ComponentFixture<UserLoginScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
