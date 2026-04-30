export const FETCH_ORDERS_URL =
  "https://usauth.app.n8n.cloud/webhook-test/fetch_orders"

export type Order = {
  order_ref: string
  first_name: string
  last_name: string
  email: string
  phone: string
  plan_label: string
  order_total: string
  doc_count: string
  payment_method: "zelle" | "paypal" | string
  destination_country: string
  submitted_at: string
  status: "pending" | "paid" | "cancelled" | string
  confirmed_at?: string
  paypal_transaction_id?: string
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const res = await fetch(FETCH_ORDERS_URL, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : (data.orders ?? data.data ?? [])
  } catch {
    return []
  }
}

export function orderStats(orders: Order[]) {
  const amt = (o: Order) =>
    parseFloat((o.order_total ?? "0").replace(/[^0-9.]/g, ""))

  const paid = orders.filter((o) => o.status === "paid")
  const pending = orders.filter((o) => o.status === "pending")

  const paypalRevenue = paid
    .filter((o) => o.payment_method === "paypal")
    .reduce((s, o) => s + amt(o), 0)

  const zelleRevenue = paid
    .filter((o) => o.payment_method === "zelle")
    .reduce((s, o) => s + amt(o), 0)

  const dueAmount = pending.reduce((s, o) => s + amt(o), 0)

  return {
    totalOrders: orders.length,
    pendingCount: pending.length,
    paidCount: paid.length,
    paypalRevenue,
    zelleRevenue,
    totalRevenue: paypalRevenue + zelleRevenue,
    dueAmount,
  }
}
