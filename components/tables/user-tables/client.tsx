"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ArrowRightCircle, Edit, MapPin, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { DotsVerticalIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const sampleHouseholds = [
  {
    id: 1,
    name: "Jha's House",
    address: "Deoghar, JH, India",
    gpsLat: 27.7172,
    gpsLong: 85.3240,
    currentTankPercentage: 50,
    capacity: 1000,
  },
  {
    id: 2,
    name: "VIT's House",
    address: "Vellore, TN, India",
    gpsLat: 27.6743,
    gpsLong: 85.3199,
    currentTankPercentage: 10,
    capacity: 5000,
  },
  {
    id: 3,
    name: "Aadarsh's House",
    address: "New delhi, DL, India",
    gpsLat: 27.6710,
    gpsLong: 85.4296,
    currentTankPercentage: 90,
    capacity: 2000,
  }
]

export const UserClient = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Your Households`}
          description="Manage your households."
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-3">
        {
          sampleHouseholds.map((household) => (
            <HouseholdCard key={household.id} {...household} />
          ))
        }
      </div>
    </>
  );
};


interface HouseholdProps {
  name: string;
  address: string;
  id: number;
  gpsLat: number;
  gpsLong: number;
  currentTankPercentage: number;
  capacity: number;
}
const HouseholdCard = ({
  name,
  address,
  id,
  gpsLat,
  gpsLong,
  currentTankPercentage,
  capacity
}: HouseholdProps) => {
  const router = useRouter();
  const linkToMap = `https://www.google.com/maps/search/?api=1&query=${gpsLat},${gpsLong}`;
  return (
    <Card className="flex flex-col items-start justify-center p-6 min-h-36">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{address}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <DotsVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            <DropdownMenuItem className="hover:bg-accent">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent">
              <ExclamationTriangleIcon className="mr-2 h-4 w-4" /> Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    <div>
      <div className="flex flex-col items-start justify-center gap-y-4">
        <div className="flex flex-row items-center gap-x-4">
          <div className="flex flex-col items-start space-y-2 pt-2">
            <p className="text-sm text-muted-foreground font-medium">Current Tank Level: {currentTankPercentage}% full</p>
            <p className="text-sm font-medium">Capacity: {capacity}L</p>
          </div>
          
        </div>
      </div>
    </div>
      <div className="flex items-center gap-x-4 pt-8">
        <Link href={linkToMap} target="_blank">
        <Button size={"default"} variant={"outline"}>
          <MapPin className="mr-2 h-4 w-4" />  Open in Maps
        </Button>
        </Link>
        <Button size={"sm"} variant={"secondary"}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button size={"sm"} variant={"default"}
          onClick={() => router.push(`/dashboard/households/${id}`)}
        >
         Open <ArrowRightCircle className="ml-2 h-4 w-4" /> 
        </Button>
      </div>
    </Card>
  )
}