"use client"

import * as React from "react"
import type { Order } from "@/lib/fetch-orders"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function fmt(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function StatusBadge({ status }: { status: string }) {
  if (status === "paid")
    return (
      <Badge className="bg-[#e1f5ee] text-[#1a9e75] border-0 font-semibold">
        Paid ✓
      </Badge>
    )
  if (status === "cancelled")
    return (
      <Badge className="bg-[#fcebeb] text-[#d94040] border-0 font-semibold">
        Cancelled
      </Badge>
    )
  return (
    <Badge className="bg-[#fff3e0] text-[#f97316] border-0 font-semibold">
      Pending
    </Badge>
  )
}

function MethodBadge({ method }: { method: string }) {
  if (method === "zelle")
    return (
      <Badge className="bg-[#f3ecfd] text-[#6D1ED4] border-0 font-semibold">
        Zelle
      </Badge>
    )
  return (
    <Badge className="bg-[#e6f1fb] text-[#0070f0] border-0 font-semibold">
      PayPal
    </Badge>
  )
}

export function OrdersTable({ data }: { data: Order[] }) {
  const [filter, setFilter] = React.useState<"all" | "pending" | "paid" | "cancelled">("all")

  const filtered = data.filter((o) => {
    if (filter === "pending") return o.payment_method === "zelle" && o.status === "pending"
    if (filter === "paid") return o.status === "paid"
    if (filter === "cancelled") return o.status === "cancelled"
    return true
  })

  const tabs: { key: typeof filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending Zelle" },
    { key: "paid", label: "Paid" },
    { key: "cancelled", label: "Cancelled" },
  ]

  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-xl border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-3 p-4 border-b sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-base">Orders</h2>
            <p className="text-sm text-muted-foreground">{data.length} total orders</p>
          </div>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const count =
                t.key === "all"
                  ? data.length
                  : t.key === "pending"
                  ? data.filter((o) => o.payment_method === "zelle" && o.status === "pending").length
                  : data.filter((o) => o.status === t.key).length
              return (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    filter === t.key
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}{" "}
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                      filter === t.key ? "bg-white/20" : "bg-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <p className="font-medium text-foreground">No orders found</p>
            <p className="text-sm">
              {data.length === 0
                ? "No data returned from the webhook yet."
                : "No orders match this filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[110px]">Ref</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order, i) => (
                  <TableRow key={order.order_ref ?? i}>
                    <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                      #{order.order_ref ?? "—"}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">
                        {order.first_name} {order.last_name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {order.email}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {order.order_total ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[160px] truncate">
                      {order.plan_label ?? "—"}
                    </TableCell>
                    <TableCell>
                      <MethodBadge method={order.payment_method ?? ""} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.destination_country ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status ?? "pending"} />
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      {fmt(order.submitted_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
