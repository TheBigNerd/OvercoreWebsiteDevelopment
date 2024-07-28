import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { CurrentRole} from "@/lib/auth";

export default async function AdminDashboard() {
    const role = await CurrentRole()
    const [salesData, userdata, productdata] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} body={formatCurrency(salesData.amount)}/>
            <DashboardCard title="Customer" subtitle={`${formatCurrency(userdata.averageValuePerUser)} Average Value`} body={formatNumber(userdata.userCount)}/>
            <DashboardCard title="Product Information" subtitle={`${formatNumber(productdata.inactiveCount)} Inactive Products`} body={`${formatNumber(productdata.activeCount)} Active Products`}/>
        </div>
    )

}

function DashboardCard({title, subtitle, body}: {title: string, subtitle: string, body: string} ) {
    return (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>{body}</CardContent>
    </Card>
    )

}

async function getSalesData() {
    const data = await prisma.order.aggregate({
        _sum: {pricePaid: true},
        _count: true
    })
    return {
        amount: (data._sum.pricePaid || 0),
        numberOfSales: data._count
    }
} 

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        prisma.user.count(),
        prisma.order.aggregate({
            _sum: { pricePaid: true },
        })
    ])
    return {
        userCount,
        averageValuePerUser: userCount == 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount

    }
}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        prisma.product.count({where: {isAvailable: true }}),
        prisma.product.count({where: {isAvailable: false }})
    ])
    return (
        { activeCount, inactiveCount}
    )

}