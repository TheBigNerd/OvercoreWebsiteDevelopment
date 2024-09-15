import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CustomComponents() {

return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="CPU" subtitle="cpus Total =" body="10" componenttype="cpu"></DashboardCard>
        <DashboardCard title="CPU Cooler" subtitle="CPU Cooler Total =" body="10" componenttype="cpuCooler"></DashboardCard>
        <DashboardCard title="Motherboard" subtitle="Motherboard Total =" body="10" componenttype="motherboard"></DashboardCard>
        <DashboardCard title="Memory" subtitle="Memory Total =" body="10" componenttype="memory"></DashboardCard>
        <DashboardCard title="Storage" subtitle="Storage Total =" body="10" componenttype="storage"></DashboardCard>
        <DashboardCard title="GPU" subtitle="GPU Total =" body="10" componenttype="gpu"></DashboardCard>
        <DashboardCard title="Case" subtitle="Case Total =" body="10" componenttype="case"></DashboardCard>
        <DashboardCard title="PSU" subtitle="PSU Total =" body="10" componenttype="psu"></DashboardCard>
    </div>
)
}

function DashboardCard({title, subtitle, body, componenttype}: {title: string, subtitle: string, body: string, componenttype: string}

 ) {
    return (
    <Card className="bg-slate-200">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>{body}</CardContent>
        <div className="p-4">
            <Link href={`/admin/customcomponents/${componenttype}`}>
            <Button className="bg-slate-500">
                Edit Component Information
            </Button>
            </Link>
  
        </div>
    </Card>
    )
}