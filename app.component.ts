import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent,FreezeService} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ FreezeService ]
})
export class AppComponent {
    public data: Object[] = [];
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    public content: string = 'Atleast one Column should be in movable';
    public header: string = 'Frozen';
    public visible: boolean = false;
    public animationSettings: object = { effect: 'None' };
    public showCloseIcon: boolean = false;
    public freezed: boolean = false;
    public target: string = '.control-section';
    public width: string = '300px';
    public contextMenuItems: Object;

    public len : Number = 0;
    public f_name : String = '';


    ngOnInit(): void {
        this.data = sampleData;
        this.contextMenuItems= [
            {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
            {text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
            { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
            { text: 'Expand All', target: '.e-headercontent', id: 'expandall' },
            { text: 'Freeze Left', target: '.e-headercontent', id: 'freezeleft' }
         ]
    }
    contextMenuOpen (arg?: BeforeOpenCloseEventArgs): void {
        let elem: Element = arg.event.target as Element;
        let row: Element = elem.closest('.e-row');
        let uid: string = row && row.getAttribute('data-uid');
        let items: Array<HTMLElement> = [].slice.call(document.querySelectorAll('.e-menu-item'));
        for (let i: number = 0; i < items.length; i++) {
          items[i].setAttribute('style','display: none;');
        }
        if (elem.closest('.e-row')) {
          if ( isNullOrUndefined(uid) || 
            isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
            arg.cancel = true;
          } else {
            let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
            let val: string = flag ? 'none' : 'block';
            document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
            val = !flag ? 'none' : 'block';
            document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
          }
        } else {
          let len = this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
          if (len !== 0) {
            document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
            document.querySelectorAll('li#freezeleft')[0].setAttribute('style', 'display: block;');
          } else {
            document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
            document.querySelectorAll('li#freezeleft')[0].setAttribute('style', 'display: block;');
          }
        }
    }
    contextMenuClick (args?: MenuEventArgs): void {
        if (args.item.id === 'collapserow') {
          this.treegrid.collapseRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
        } else if (args.item.id === 'expandrow') {
          this.treegrid.expandRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
        } else if (args.item.id === 'collapseall') {
          this.treegrid.collapseAll();
        } else if (args.item.id === 'expandall') {
          this.treegrid.expandAll();
        } else if (args.item.id === 'freezeleft') {
          if(args.column.field != null && args.column.field!==undefined)
          {
            //let mvblColumns: Column[] = this.treegrid.getMovableColumns();
            
            for(var i=0;i<this.treegrid.getColumnFieldNames().length;i++)
            {
              if(args.column.field == this.treegrid.getColumnFieldNames()[i] && i == this.treegrid.getColumnFieldNames().length-1)
              {
                //last-column prevent to freeze left
                console.log('asdasdas');
                this.freezed = false;
                this.alertDialog.show();   
                break;
              }
              else if(args.column.field == this.treegrid.getColumnFieldNames()[i])
              {
                if(this.treegrid.getColumnByField(this.treegrid.getColumnFieldNames()[i]).index==0)
                {
                this.freezed = false;
                  this.treegrid.getColumnByField(args.column.field).freeze = 'Left'; 
                  this.treegrid.refreshColumns();
                }
                else
                {
                  this.freezed = true;
                  // for(var j=0;j<=this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field).index;j++)
                  // {
                    // if(this.treegrid.getMovableColumns()[i].field != null && this.treegrid.getMovableColumns()[i].field!==undefined)
                    // {
                    //   this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field).freeze = 'Left';
                    // }
                    // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j].field).isFrozen = true;
                    // this.treegrid.refreshColumns();
                    // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j+1].field).freeze = 'Left';
                    // sleep(2500);
                    // this.treegrid.refreshColumns();
                    // document.querySelectorAll('e-column[field=""]')[0].setAttribute('style', 'display: block;');
                    // console.log(document.querySelectorAll('.e-headercell')[j]);
                    // document.querySelectorAll('.e-headercell')[j].setAttribute('freeze','Left');
                    // if(j==this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field).index)
                    // {

                    //   // this.treegrid.refreshColumns();
                    // }
                    // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j+1].field).freeze = 'Left';
                    // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j+2].field).freeze = 'Left';
                    // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j+1].field).freeze = 'Left';
                    // this.treegrid.dataSource = this.data;
                    // this.treegrid.refreshColumns();
                  // }
                }
                // console.log(this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field));
                // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field).freeze = 'Left';
                // this.treegrid.refreshColumns();
              }
              // console.log(this.treegrid.getMovableColumns()[i].field);

              // this.treegrid.refreshColumns();
            }

            if(this.freezed==true)
            {
              // this.treegrid.refreshColumns();
              // console.log('HERE');
              // console.log(this.treegrid.Columns());
              // if(this.treegrid.getMovableColumns().length != null && this.treegrid.getMovableColumns().length != undefined)
              // {
                this.len = args.column.index;
                for(var i=0;i<=this.len;i++)
                {
                  console.log(this.treegrid.getColumnFieldNames().length);
                  // console.log(this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field));
                  // this.f_name = this.treegrid.getMovableColumns()[i].field;
                  // console.log(this.f_name);
                  this.treegrid.getColumnByField(this.treegrid.getColumnFieldNames()[i]).freeze = 'Left';
                  // console.log(this.treegrid.getColumnFieldNames()[i]);
                  // if(i==0)
                  // {

                  //   this.treegrid.getColumnByField('taskID').freeze = 'Left';
                  // }
                  // else
                  // {

                  //   this.treegrid.getColumnByField('taskName').freeze = 'Left';
                  // }

                  // for(var j=0;j<=args.column.index;j++)
                  // {
                  //   // if(this.treegrid.getMovableColumns()[i].field != null && this.treegrid.getMovableColumns()[i].field!==undefined)
                  //   // {
                  //     // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field).freeze = 'Left';
                  //     // this.treegrid.getColumnByField('taskID').freeze = 'Left';
                  //     // this.treegrid.getColumnByField('taskName').freeze = 'Left';
                  //     // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j].field).freeze = 'Left';
                  //     // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[j+1].field).freeze = 'Left';
                      
                  //     // this.treegrid.getColumnByIndex(0).freeze = 'Left';
                      
                  //   // }
                  // }
  
  
                  // if(args.column.field == this.treegrid.getMovableColumns()[i].field)
                  // {
                  //   // console.log(this.treegrid.getMovableColumns()[i].field);
                  //   // this.treegrid.getColumnByField(this.treegrid.getMovableColumns()[i].field).freeze = 'Left';
                  // }
                }
              // }
              // for(var m = 0;m<2;m++)
              // {
              //   if(m==0)
              //   {

              //     this.treegrid.getColumnByField('taskID').freeze = 'Left';
              //   }
              //   else
              //   {
              //     this.treegrid.getColumnByField('taskName').freeze = 'Left';
              //   }

              // }
              this.treegrid.refreshColumns();

              // this.treegrid.getColumnByField('taskName').freeze = 'Left';
              // this.treegrid.refreshColumns();
              // console.log(this.treegrid.getColumnByField('taskName').freeze);
              // this.treegrid.refreshColumns();
            }
            // if (mvblColumns.length === 1 && args.column.field === mvblColumns[0].field && 'Center' !== mvblColumns[0].freeze) {
            //     this.alertDialog.show(); 
            //     //this.refresh = false; this.directionDropDown.value = "Center"; this.directionDropDown.refresh();
            // }
            // else
            // {
            //   this.treegrid.getColumnByField(args.column.field).freeze = 'Left'; 
            //   this.treegrid.refreshColumns();
            //   // console.log(args.column.field);
            // }
          }
        }
    }

    public alertDialogBtnClick = (): void => {
        this.alertDialog.hide();
    }

    public dlgButtons: ButtonPropsModel[] = [{ click: this.alertDialogBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
}
