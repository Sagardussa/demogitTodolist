import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTAskVAlue: string = '';
  editDate: string = '';
  editTime: string = '';

  date: string = '';
  time: string = '';
  show: boolean = false;

  constructor(private curdService: CrudService) {}

  ngOnInit(): void {
    this.editTAskVAlue = '';
    this.editDate = '';
    this.editTime = '';
    this.addTaskValue = '';
    this.date = '';
    this.time = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.curdService.getAllTask().subscribe(
      (res) => {
        this.taskArr = res;
        // console.log(res);
      },
      (err) => {
        alert('unable to get list of Task ');
      }
    );
  }
  addTask() {
    if (this.addTaskValue == '' || this.date == '' || this.time == '') {
      alert('enter all information');
    } else {
      this.taskObj.task_name = this.addTaskValue;
      this.taskObj.date = this.date;
      this.taskObj.time = this.time;
      this.curdService.addtask(this.taskObj).subscribe(
        (res) => {
          this.ngOnInit();
          this.addTaskValue = '';
          this.date = '';
          this.time = '';
        },
        (err) => {
          alert(err);
        }
      );
    }
    alert('Done');
  }

  editTask() {
    this.taskObj.task_name = this.editTAskVAlue;
    this.taskObj.date = this.editDate;
    this.taskObj.time = this.editTime;
    this.curdService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('failed to update task');
      }
    );
  }

  deleteTask(etask: Task) {
    this.curdService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('failed to delete Task ');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTAskVAlue = etask.task_name;
    this.editDate = etask.date;
    this.editTime = etask.time;
  }
}
