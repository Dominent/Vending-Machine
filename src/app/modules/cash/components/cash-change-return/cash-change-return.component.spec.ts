import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { RoundPipe } from '../../../shared/pipes/round.pipe';
import { CashChangeReturnComponent } from './cash-change-return.component';

describe('CashChangeReturnComponent', () => {
  let component: CashChangeReturnComponent;
  let fixture: ComponentFixture<CashChangeReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashChangeReturnComponent, MockPipe(RoundPipe)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashChangeReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct change input', () => {
    component.change = 100;
    expect(component.change).toBe(100);
  });

  it('should have coinTray viewChild', () => {
    expect(component.coinTray).toBeDefined();
  });

  describe('simulateChangeReturn', () => {
    it('should create coins in coinTray', () => {
      // Mock coinTray element
      const mockElementRef = jasmine.createSpyObj('ElementRef', [
        'nativeElement',
      ]);
      mockElementRef.nativeElement = {
        offsetWidth: 100,
        appendChild: jasmine.createSpy(),
      };
      component.coinTray = mockElementRef;

      component.simulateChangeReturn(5);

      expect(mockElementRef.nativeElement.appendChild).toHaveBeenCalledTimes(5);
    });
  });
});
