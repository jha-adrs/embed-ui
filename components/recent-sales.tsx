import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DropletIcon, DropletsIcon } from "lucide-react";
enum WATER_CHANGE {
  HIGH = 3,
  MEDIUM = 2,
  LOW = 1,
  ERROR = 0
}
const recentData = [
  { usage: WATER_CHANGE.LOW, temperature: 39.7, humidity: 88, consumption: 30, time: "1h ago" },
  { usage: WATER_CHANGE.MEDIUM, temperature: 42.1, humidity: 85, consumption: 35, time: "2h ago" },
  { usage: WATER_CHANGE.HIGH, temperature: 45.3, humidity: 80, consumption: 40, time: "4h ago" },
  { usage: WATER_CHANGE.LOW, temperature: 38.6, humidity: 82, consumption: 32, time: "5h ago" },
  { usage: WATER_CHANGE.MEDIUM, temperature: 41.2, humidity: 86, consumption: 36,time: "6h ago" },
  { usage: WATER_CHANGE.HIGH, temperature: 44.8, humidity: 81, consumption: 38, time: "7h ago" },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {
        recentData.map((item, index) => {
          return (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9 ">
                <div className={
                  cn("w-full h-full flex items-center justify-center",
                  item.usage === WATER_CHANGE.HIGH ? "bg-red-500" :
                  item.usage === WATER_CHANGE.MEDIUM ? " bg-orange-500" :
                  item.usage === WATER_CHANGE.LOW ? "bg-sky-500" :
                  "bg-gray-500"
                  )
                }>
                  {
                    (item.usage === WATER_CHANGE.HIGH ||item.usage === WATER_CHANGE.MEDIUM ) && <DropletsIcon className="w-5 h-5 text-primary-foreground" />
                  }
                  {
                    (item.usage !== WATER_CHANGE.HIGH && item.usage !== WATER_CHANGE.MEDIUM ) && <DropletIcon className="w-5 h-5 text-primary-foreground" />
                  }
                </div>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Water Consumed <span className="text-muted-foreground text-xs"> ({item.time})</span></p>
                <p className="text-sm text-muted-foreground">
                {item.consumption} Liters
                </p>
              </div>
              <div className="ml-auto text-sm font-medium flex flex-col gap-y-0">
                  <p className="text-muted-foreground">
                    Temp {item.temperature}C
                  </p>
                  <p className="text-muted-foreground">
                    Humidity {item.humidity}%
                  </p>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
