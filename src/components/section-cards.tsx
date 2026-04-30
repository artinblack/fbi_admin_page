"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import type { Order } from "@/lib/fetch-orders"
import { orderStats } from "@/lib/fetch-orders"

export function SectionCards({ orders }: { orders: Order[] }) {
  const stats = orderStats(orders)

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${stats.totalRevenue.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              {stats.paidCount} paid
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Confirmed payments <CheckCircleIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            PayPal ${stats.paypalRevenue.toFixed(2)} · Zelle ${stats.zelleRevenue.toFixed(2)}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Due Amount</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${stats.dueAmount.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ClockIcon />
              {stats.pendingCount} pending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Awaiting confirmation <AlertCircleIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Pending Zelle payments
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalOrders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              All time
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            All submitted orders
          </div>
          <div className="text-muted-foreground">
            {stats.paidCount} paid · {stats.pendingCount} pending
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Zelle Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${stats.zelleRevenue.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <CheckCircleIcon />
              confirmed
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Verified Zelle payments
          </div>
          <div className="text-muted-foreground">
            PayPal ${stats.paypalRevenue.toFixed(2)} confirmed
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}
