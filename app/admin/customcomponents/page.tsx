import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CustomComponents() {

return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="CPU" subtitle="cpus Total =" body="10" componenttype="cpu"></DashboardCard>
        <DashboardCard title="CPU Cooler" subtitle="CPU Cooler Total =" body="10" componenttype="cpuCooler"></DashboardCard>
    </div>
)
}

function DashboardCard({title, subtitle, body, componenttype}: {title: string, subtitle: string, body: string, componenttype: string}

 ) {
    return (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>{body}</CardContent>
        <div className="p-4">
            <Link href={`/admin/customcomponents/${componenttype}`}>
            <Button>
                Edit Component Information
            </Button>
            </Link>
  
        </div>
    </Card>
    )
}