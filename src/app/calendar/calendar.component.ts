import { CommonModule, formatCurrency } from "@angular/common";
import { Component, Output, EventEmitter, AfterViewInit,viewChild, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DayPilotModule, DayPilotCalendarComponent, DayPilotNavigatorComponent, DayPilotMonthComponent, DayPilot } from "@daypilot/daypilot-lite-angular";
import { DataService } from "../services/data.service";


@Component({
  standalone:true,
  imports:[CommonModule,FormsModule,DayPilotModule],
  providers:[DataService],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements AfterViewInit {
  @Output() closeCalEvent = new EventEmitter<void>();
@ViewChild("day") day!: DayPilotCalendarComponent;
@ViewChild("week") week!:DayPilotCalendarComponent;
@ViewChild("month") month!:DayPilotMonthComponent;
@ViewChild("nav") nav!:DayPilotNavigatorComponent;
events: DayPilot.EventData[] = [];
date = DayPilot.Date.today();
contextMenu = new DayPilot.Menu({
  items: [
    {
      text: "Delete",
      onClick: args => {
        const event = args.source;
        const dp = event.calendar;
        dp.events.remove(event);
      }
    },
    {
      text: "Edit...",
      onClick: async args => {
        const event = args.source;
        const dp = event.calendar;

        const modal = await DayPilot.Modal.prompt("Edit event text:", event.data.text);
        dp.clearSelection();
        if (!modal.result) { return; }
        event.data.text = modal.result;
        dp.events.update(event);
      }
    },
    {
      text: "-"
    },
    {
      text: "Red",
      onClick: args => {
        const event = args.source;
        const dp = event.calendar;
        event.data.backColor = DataService.colors.red;
        dp.events.update(event);
      }
    },
    {
      text: "Green",
      onClick: args => {
        const event = args.source;
        const dp = event.calendar;
        event.data.backColor = DataService.colors.green;

        dp.events.update(event);
      }
    },
    {
      text: "Blue",
      onClick: args => {
        const event = args.source;
        const dp = event.calendar;
        event.data.backColor = DataService.colors.blue;

        dp.events.update(event);
      }
    },
    {
      text: "Yellow",
      onClick: args => {
        const event = args.source;
        const dp = event.calendar;
        event.data.backColor = DataService.colors.yellow;

        dp.events.update(event);
      }
    },

    {
      text: "Gray",
      onClick: args => {
        const event = args.source;
        const dp = event.calendar;
        event.data.backColor = DataService.colors.gray;

        dp.events.update(event);
      }
    }
  ]
});

configNavigator: DayPilot.NavigatorConfig = {
  showMonths: 3,
  cellWidth: 25,
  cellHeight: 25,
  onVisibleRangeChanged: args => {
    this.loadEvents();
  }
};

selectTomorrow() {
  this.date = DayPilot.Date.today().addDays(1);
}

changeDate(date: DayPilot.Date): void {
  this.configDay.startDate = date;
  this.configWeek.startDate = date;
  this.configMonth.startDate = date;
}

configDay: DayPilot.CalendarConfig = {
  durationBarVisible: false,
  contextMenu: this.contextMenu,
  onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
  onBeforeEventRender: this.onBeforeEventRender.bind(this),
  onEventClick: this.onEventClick.bind(this),
};

configWeek: DayPilot.CalendarConfig = {
  viewType: "Week",
  durationBarVisible: false,
  contextMenu: this.contextMenu,
  onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
  onBeforeEventRender: this.onBeforeEventRender.bind(this),
  onEventClick: this.onEventClick.bind(this),
};

configMonth: DayPilot.MonthConfig = {
  contextMenu: this.contextMenu,
  eventBarVisible: false,
  onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
  onEventClick: this.onEventClick.bind(this),
};

constructor(private ds: DataService) {
  this.viewWeek();
}

ngAfterViewInit(): void {
  this.loadEvents();
}

loadEvents(): void {
  const from = this.nav.control.visibleStart();
  const to = this.nav.control.visibleEnd();
  this.ds.getEvents(from, to).subscribe(result => {
    this.events = result;
  });
}

viewDay():void {
  this.configNavigator.selectMode = "Day";
  this.configDay.visible = true;
  this.configWeek.visible = false;
  this.configMonth.visible = false;
}

viewWeek():void {
  this.configNavigator.selectMode = "Week";
  this.configDay.visible = false;
  this.configWeek.visible = true;
  this.configMonth.visible = false;
}

viewMonth():void {
  this.configNavigator.selectMode = "Month";
  this.configDay.visible = false;
  this.configWeek.visible = false;
  this.configMonth.visible = true;
}

onBeforeEventRender(args: any) {
    const dp = args.control;
    args.data.areas = [
      {
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        symbol: "assets/icons/daypilot.svg#minichevron-down-2",
        fontColor: "#fff",
        toolTip: "Show context menu",
        action: "ContextMenu",
      },
      {
        top: 3,
        right: 25,
        width: 20,
        height: 20,
        symbol: "assets/icons/daypilot.svg#x-circle",
        fontColor: "#fff",
        action: "None",
        toolTip: "Delete event",
        onClick: async (args: any)   => {
          dp.events.remove(args.source);
        }
      }
    ];

    args.data.areas.push({
      bottom: 5,
      left: 5,
      width: 36,
      height: 36,
      action: "None",
      image: `https://picsum.photos/36/36?random=${args.data.id}`,
      style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
    });
}

async onTimeRangeSelected(args: any) {
  const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
  const dp = args.control;
  dp.clearSelection();
  if (!modal.result) { return; }
  dp.events.add(new DayPilot.Event({
    start: args.start,
    end: args.end,
    id: DayPilot.guid(),
    text: modal.result
  }));
}

async onEventClick(args: any) {
  const form = [
    {name: "Text", id: "text"},
    {name: "Start", id: "start", dateFormat: "MM/dd/yyyy", type: "datetime"},
    {name: "End", id: "end", dateFormat: "MM/dd/yyyy", type: "datetime"},
    {name: "Color", id: "backColor", type: "select", options: this.ds.getColors()},
  ];

  const data = args.e.data;

  const modal = await DayPilot.Modal.form(form, data);

  if (modal.canceled) {
    return;
  }

  const dp = args.control;

  dp.events.update(modal.result);
}

  closeCal() {
    this.closeCalEvent.emit();
  }

}
