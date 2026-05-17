import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterScreen } from './user-register-screen';

describe('UserRegisterScreen', () => {
  let component: UserRegisterScreen;
  let fixture: ComponentFixture<UserRegisterScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegisterScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegisterScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
