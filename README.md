# Gametosa-Store-
# Gametosa E‑Commerce Starter (Next.js + TypeScript)

Below is a minimal-but-extensible open‑source friendly starter you can copy into a new GitHub repo to launch an ecommerce storefront for **Gametosa**. It includes:

- **Next.js (App Router)** frontend + API routes (fullstack in one repo).
- **TypeScript** throughout.
- **Prisma ORM** with SQLite for local/dev and ready to switch to PostgreSQL/MySQL in prod.
- **NextAuth (Credentials + Magic Link ready stub)** for user accounts (optional; can be disabled).
- **Cart + Checkout flow** (guest cart stored in localStorage; server cart when signed in).
- **Simple Orders** with COD / UPI Placeholder payment step (easy to replace w/ Stripe, Razorpay, Paytm, etc.).
- **Admin dashboard** (basic: add/edit products, upload images, mark inventory).
- **Tailwind CSS** styling + dark mode friendly (aligns with your Gametosa aesthetic).
- **Env config** using `.env.local`.
- **Seed script** loads sample Gametosa products (skins, merch, top‑ups, tournament passes, etc.).

---
## Quick Start

```bash
# 1. Create new repo directory
mkdir gametosa-store && cd gametosa-store

# 2. Initialize git
git init

# 3. Copy the file structure below (create folders + files)
# (You can paste from this doc or download a zip I'll help you build later.)

# 4. Install deps
pnpm install   # or npm install / yarn install

# 5. Generate the Prisma client & migrate DB
npx prisma migrate dev --name init

# 6. Seed sample data
pnpm run seed

# 7. Run dev server
pnpm dev
```

Open http://localhost:3000.

---
## File/Folder Structure

```
 gametosa-store/
 ├─ .env.example
 ├─ .gitignore
 ├─ package.json
 ├─ pnpm-lock.yaml            # or yarn.lock / package-lock.json
 ├─ prisma/
 │   ├─ schema.prisma
 │   └─ seed.ts
 ├─ scripts/
 │   └─ create-env.ts         # helper to scaffold env
 ├─ public/
 │   ├─ gametosa-logo.svg
 │   ├─ placeholder.png
 │   └─ products/
 │       ├─ hoodie.png
 │       ├─ mousepad.png
 │       └─ topup.png
 ├─ src/
 │   ├─ app/
 │   │   ├─ layout.tsx
 │   │   ├─ page.tsx                # storefront landing
 │   │   ├─ products/
 │   │   │   ├─ page.tsx            # all products grid
 │   │   │   └─ [slug]/page.tsx     # product detail
 │   │   ├─ cart/
 │   │   │   └─ page.tsx
 │   │   ├─ checkout/
 │   │   │   ├─ page.tsx
 │   │   │   └─ success/page.tsx
 │   │   ├─ account/
 │   │   │   ├─ page.tsx
 │   │   │   └─ orders/page.tsx
 │   │   ├─ admin/
 │   │   │   ├─ layout.tsx
 │   │   │   ├─ page.tsx            # admin dashboard home
 │   │   │   ├─ products/page.tsx   # admin products list
 │   │   │   └─ products/new/page.tsx
 │   │   ├─ api/
 │   │   │   ├─ products/route.ts   # GET/POST products
 │   │   │   ├─ cart/route.ts       # cart sync
 │   │   │   ├─ checkout/route.ts   # create order
 │   │   │   ├─ orders/route.ts     # list orders (auth)
 │   │   │   └─ auth/[...nextauth]/route.ts
 │   ├─ components/
 │   │   ├─ ui/ (re-export shadcn components used)
 │   │   ├─ header.tsx
 │   │   ├─ footer.tsx
 │   │   ├─ product-card.tsx
 │   │   ├─ product-grid.tsx
 │   │   ├─ add-to-cart-button.tsx
 │   │   ├─ cart-drawer.tsx
 │   │   ├─ quantity-stepper.tsx
 │   │   ├─ price.tsx
 │   │   ├─ theme-toggle.tsx
 │   │   └─ ...
 │   ├─ lib/
 │   │   ├─ db.ts                # Prisma client
 │   │   ├─ products.ts          # data helpers
 │   │   ├─ cart.ts              # cart helpers (merge client/server)
 │   │   ├─ currency.ts          # INR formatting
 │   │   ├─ auth.ts              # NextAuth config helpers
 │   │   └─ validators.ts        # zod schemas
 │   ├─ styles/
 │   │   └─ globals.css
 │   ├─ types/
 │   │   └─ index.d.ts
 │   └─ hooks/
 │       ├─ use-cart.ts
 │       └─ use-local-storage.ts
 ├─ tsconfig.json
 ├─ next.config.mjs
 ├─ postcss.config.cjs
 └─ tailwind.config.js
```

---
## Environment Variables
Copy `.env.example` to `.env.local` and fill.

```env
# Database (default SQLite)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="changeme-long-random-string"
NEXTAUTH_URL="http://localhost:3000"

# (Optional) SMTP for magic link emails
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="secret"
EMAIL_FROM="noreply@gametosa.com"
```

---
## package.json

```json
{
  "name": "gametosa-store",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma": "prisma",
    "migrate": "prisma migrate dev",
    "seed": "ts-node --esm prisma/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.19.0",
    "@tanstack/react-query": "^5.51.0",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "axios": "^1.7.2",
    "clsx": "^2.1.1",
    "lucide-react": "^0.424.0",
    "next": "^15.0.0-canary",
    "next-auth": "^5.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "autoprefixer": "^10.4.19",
    "bcrypt": "^5.1.1",
    "eslint": "^9.5.0",
    "eslint-config-next": "^15.0.0-canary",
    "postcss": "^8.4.39",
    "prisma": "^5.19.0",
    "tailwindcss": "^3.4.9",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.3"
  }
}
```

> **Note:** Feel free to pin stable versions (e.g., Next 14) if you prefer. Canary used for latest App Router features.

---
## Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String?  @unique
  emailVerified DateTime?
  hashedPassword String?
  role          Role     @default(USER)
  orders        Order[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  priceInINR  Int      // stored in paisa? we'll store rupees *100? see below
  images      ProductImage[]
  inStock     Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  categories  Category[] @relation("ProductsOnCategories", references: [id])
}

model ProductImage {
  id        String   @id @default(cuid())
  url       String
  alt       String?
  product   Product  @relation(fields: [productId], references: [id])
  productId String
}

model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  products  Product[] @relation("ProductsOnCategories")
}

model Order {
  id          String        @id @default(cuid())
  user        User?         @relation(fields: [userId], references: [id])
  userId      String?
  items       OrderItem[]
  totalInINR  Int
  status      OrderStatus   @default(PENDING)
  paymentRef  String?
  address     String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model OrderItem {
  id         String   @id @default(cuid())
  order      Order    @relation(fields: [orderId], references: [id])
  orderId    String
  product    Product  @relation(fields: [productId], references: [id])
  productId  String
  quantity   Int
  priceInINR Int      // snapshot at purchase time
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---
## Prisma Seed (`prisma/seed.ts`)

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // categories
  const catMerch = await prisma.category.upsert({
    where: { slug: "merch" },
    update: {},
    create: { name: "Merch", slug: "merch" },
  });
  const catDigital = await prisma.category.upsert({
    where: { slug: "digital" },
    update: {},
    create: { name: "Digital", slug: "digital" },
  });

  // products
  const products = [
    {
      name: "Gametosa Pro Hoodie",
      slug: "gametosa-pro-hoodie",
      description: "Premium cotton hoodie with Gametosa logo.",
      priceInINR: 199900, // 1999.00 INR in paisa
      inStock: 100,
      categories: { connect: [{ id: catMerch.id }] },
      images: {
        create: [{ url: "/products/hoodie.png", alt: "Gametosa Hoodie" }],
      },
    },
    {
      name: "Gametosa Mousepad XL",
      slug: "gametosa-mousepad-xl",
      description: "Extended gaming mousepad with stitched edges.",
      priceInINR: 99900,
      inStock: 250,
      categories: { connect: [{ id: catMerch.id }] },
      images: {
        create: [{ url: "/products/mousepad.png", alt: "Mousepad" }],
      },
    },
    {
      name: "Free Fire Diamond Top‑Up (1000)",
      slug: "freefire-diamond-1000",
      description: "Instant delivery of 1000 FF Diamonds via UID.",
      priceInINR: 79900,
      inStock: 9999,
      categories: { connect: [{ id: catDigital.id }] },
      images: {
        create: [{ url: "/products/topup.png", alt: "FF Diamonds" }],
      },
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // admin user (password: admin123)
  const bcrypt = await import("bcrypt");
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@gametosa.com" },
    update: {},
    create: {
      name: "Gametosa Admin",
      email: "admin@gametosa.com",
      hashedPassword: hash,
      role: "ADMIN",
    },
  });
}

main()
  .then(() => console.log("Seeded"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---
## `src/lib/db.ts`

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---
## Currency Helper (`src/lib/currency.ts`)

```ts
export function formatINR(amountInPaisa: number): string {
  const rupees = amountInPaisa / 100;
  return rupees.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
}
```

---
## Product Helpers (`src/lib/products.ts`)

```ts
import { prisma } from "./db";

export async function getActiveProducts() {
  return prisma.product.findMany({
    where: { active: true },
    include: { images: true, categories: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { images: true, categories: true },
  });
}
```

---
## Cart Helpers (`src/lib/cart.ts`)

```ts
import type { Product } from "@prisma/client";

export type CartItem = {
  productId: string;
  name: string;
  priceInINR: number;
  qty: number;
  image?: string;
};

export type Cart = Record<string, CartItem>; // keyed by productId

export function addToCart(cart: Cart, product: Product, qty = 1, image?: string): Cart {
  const existing = cart[product.id];
  const newQty = (existing?.qty || 0) + qty;
  return {
    ...cart,
    [product.id]: {
      productId: product.id,
      name: product.name,
      priceInINR: product.priceInINR,
      qty: newQty,
      image,
    },
  };
}

export function updateQty(cart: Cart, productId: string, qty: number): Cart {
  if (qty <= 0) {
    const { [productId]: _, ...rest } = cart;
    return rest;
  }
  return { ...cart, [productId]: { ...cart[productId], qty } };
}

export function cartTotal(cart: Cart): number {
  return Object.values(cart).reduce((sum, item) => sum + item.priceInINR * item.qty, 0);
}
```

---
## Zod Validators (`src/lib/validators.ts`)

```ts
import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(5, "Too short"),
  paymentMethod: z.enum(["COD", "UPI"]),
});
```

---
## Global Styles (`src/styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --gametosa-sky: 0 191 255; /* #00BFFF */
  --gametosa-mid: 30 144 255; /* #1E90FF */
  --gametosa-royal: 65 105 225; /* #4169E1 */
}

body {
  @apply bg-neutral-950 text-neutral-100 antialiased;
}

.text-gradient-gametosa {
  background: linear-gradient(90deg, #00BFFF 0%, #1E90FF 50%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---
## Root Layout (`src/app/layout.tsx`)

```tsx
import "../styles/globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Gametosa Store",
  description: "Official Gametosa merchandise & digital goods.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---
## Storefront Landing (`src/app/page.tsx`)

```tsx
import Link from "next/link";
import { getActiveProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

export const dynamic = "force-dynamic"; // always fresh for demo

export default async function HomePage() {
  const products = await getActiveProducts();
  return (
    <div className="space-y-8">
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gradient-gametosa">Gametosa Store</h1>
        <p className="text-lg text-neutral-300">Merch, in‑game top‑ups & tournament passes.</p>
        <Link href="/products" className="underline text-sky-400">Browse all products →</Link>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}
```

---
## Products Grid Page (`src/app/products/page.tsx`)

```tsx
import { getActiveProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getActiveProducts();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

---
## Product Detail Page (`src/app/products/[slug]/page.tsx`)

```tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatINR } from "@/lib/currency";

interface Props { params: { slug: string } }

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  const img = product.images[0]?.url || "/placeholder.png";
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative w-full aspect-square">
        <Image src={img} alt={product.images[0]?.alt || product.name} fill className="object-contain" />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-sky-300">{formatINR(product.priceInINR)}</p>
        <p className="text-neutral-300 whitespace-pre-line">{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
```

---
## Cart Page (`src/app/cart/page.tsx`)

```tsx
"use client";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { formatINR } from "@/lib/currency";

export default function CartPage() {
  const { cartItems, total, updateItem, removeItem } = useCart();
  const items = Object.values(cartItems);
  if (!items.length) {
    return (
      <div className="text-center space-y-4">
        <p>Your cart is empty.</p>
        <Link className="underline" href="/products">Shop now →</Link>
      </div>
    );
  }
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold">Cart</h1>
      <ul className="divide-y divide-neutral-700">
        {items.map((item) => (
          <li key={item.productId} className="py-4 flex items-center justify-between gap-4">
            <span>{item.name}</span>
            <input
              type="number"
              min={1}
              value={item.qty}
              onChange={(e) => updateItem(item.productId, Number(e.target.value))}
              className="w-16 bg-neutral-800 p-1 text-center rounded"
            />
            <span>{formatINR(item.priceInINR * item.qty)}</span>
            <button onClick={() => removeItem(item.productId)} className="text-red-400 text-sm underline">Remove</button>
          </li>
        ))}
      </ul>
      <div className="text-right text-xl">Total: {formatINR(total)}</div>
      <div className="text-right">
        <Link href="/checkout" className="inline-block bg-sky-500 hover:bg-sky-600 text-black font-semibold px-4 py-2 rounded">Checkout</Link>
      </div>
    </div>
  );
}
```

---
## Checkout Page (`src/app/checkout/page.tsx`)

```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { checkoutSchema } from "@/lib/validators";

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", address: "", paymentMethod: "COD" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const parse = checkoutSchema.safeParse(form);
    if (!parse.success) {
      setError(parse.error.errors[0]?.message || "Invalid input");
      return;
    }
    if (!Object.keys(cartItems).length) {
      setError("Cart empty");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, cart: cartItems, total }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      clearCart();
      router.push("/checkout/success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <input
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-neutral-800 p-2 rounded"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-neutral-800 p-2 rounded"
      />
      <textarea
        placeholder="Delivery address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full bg-neutral-800 p-2 rounded min-h-[120px]"
      />
      <label className="block">Payment Method</label>
      <select
        value={form.paymentMethod}
        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
        className="w-full bg-neutral-800 p-2 rounded"
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI (manual)</option>
      </select>
      <button
        disabled={loading}
        onClick={submit}
        className="w-full bg-sky-500 hover:bg-sky-600 text-black font-semibold px-4 py-2 rounded mt-4 disabled:opacity-50"
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
}
```

---
## Checkout Success (`src/app/checkout/success/page.tsx`)

```tsx
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="text-center space-y-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-green-400">Order Placed!</h1>
      <p>We'll email you updates soon. Thank you for shopping with Gametosa.</p>
      <Link href="/products" className="underline">Continue Shopping →</Link>
    </div>
  );
}
```

---
## Header Component (`src/components/header.tsx`)

```tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";

export function Header() {
  const { count } = useCart();
  return (
    <header className="w-full bg-neutral-900 border-b border-neutral-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/gametosa-logo.svg" alt="Gametosa" width={32} height={32} />
          <span className="font-bold text-gradient-gametosa">Gametosa</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-sky-300">Store</Link>
          <Link href="/account" className="hover:text-sky-300">Account</Link>
          <Link href="/cart" className="relative hover:text-sky-300">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-sky-500 text-black px-1 rounded">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

---
## Footer (`src/components/footer.tsx`)

```tsx
export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800 py-8 text-center text-sm text-neutral-500">
      © {new Date().getFullYear()} Gametosa. All rights reserved.
    </footer>
  );
}
```

---
## Product Grid & Card (`src/components/product-grid.tsx` & `product-card.tsx`)

```tsx
// product-grid.tsx
import { Product } from "@prisma/client";
import { ProductCard } from "./product-card";

interface Props {
  products: (Product & { images: { url: string; alt: string | null }[] })[];
}
export function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />)
      )}
    </div>
  );
}
```

```tsx
// product-card.tsx
import Link from "next/link";
import Image from "next/image";
import { formatINR } from "@/lib/currency";
import type { Product } from "@prisma/client";

interface Props {
  product: Product & { images: { url: string; alt: string | null }[] };
}
export function ProductCard({ product }: Props) {
  const img = product.images[0]?.url || "/placeholder.png";
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-neutral-900 rounded-xl p-4 hover:ring-2 hover:ring-sky-500 transition"
    >
      <div className="relative w-full aspect-square mb-4">
        <Image src={img} alt={product.images[0]?.alt || product.name} fill className="object-contain" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5em]">{product.name}</h3>
        <p className="text-sky-300 text-sm">{formatINR(product.priceInINR)}</p>
      </div>
    </Link>
  );
}
```

---
## Add To Cart Button (`src/components/add-to-cart-button.tsx`)

```tsx
"use client";
import { useCart } from "@/hooks/use-cart";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(productId, 1)}
      className="bg-sky-500 hover:bg-sky-600 text-black font-semibold px-4 py-2 rounded"
    >
      Add to cart
    </button>
  );
}
```

---
## use-local-storage Hook (`src/hooks/use-local-storage.ts`)

```ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (raw) {
      try {
        setValue(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}
```

---
## use-cart Hook (`src/hooks/use-cart.ts`)

```ts
"use client";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";
import { cartTotal, Cart } from "@/lib/cart";
import { useProducts } from "./use-products";

export function useCart() {
  const [cart, setCart] = useLocalStorage<Cart>("gametosa-cart", {});
  const { productsById } = useProducts();

  const addItem = useCallback((productId: string, qty = 1) => {
    const prod = productsById[productId];
    if (!prod) return;
    setCart((c: Cart) => {
      const existing = c[productId];
      const newQty = (existing?.qty || 0) + qty;
      return {
        ...c,
        [productId]: {
          productId,
          name: prod.name,
          priceInINR: prod.priceInINR,
          qty: newQty,
          image: prod.images?.[0]?.url,
        },
      };
    });
  }, [productsById, setCart]);

  const updateItem = useCallback((productId: string, qty: number) => {
    setCart((c: Cart) => {
      if (qty <= 0) {
        const { [productId]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [productId]: { ...c[productId], qty } };
    });
  }, [setCart]);

  const removeItem = useCallback((productId: string) => {
    setCart((c: Cart) => {
      const { [productId]: _, ...rest } = c;
      return rest;
    });
  }, [setCart]);

  const clearCart = useCallback(() => setCart({}), [setCart]);

  const count = useMemo(() => Object.values(cart).reduce((s, i) => s + i.qty, 0), [cart]);
  const total = useMemo(() => cartTotal(cart), [cart]);

  return { cartItems: cart, addItem, updateItem, removeItem, clearCart, count, total };
}
```

---
## use-products Hook (`src/hooks/use-products.ts`)

```ts
"use client";
import useSWR from "swr";
import { Product } from "@prisma/client";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export function useProducts() {
  const { data, error, isLoading } = useSWR<(Product & { images: { url: string; alt: string | null }[] })[]>("/api/products", fetcher);
  const productsById = (data || []).reduce<Record<string, any>>((acc, p) => { acc[p.id] = p; return acc; }, {});
  return { products: data || [], productsById, error, isLoading };
}
```

---
## API Routes

### `GET/POST /api/products` (`src/app/api/products/route.ts`)

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({ include: { images: true } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  // TODO: auth check
  const prod = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      priceInINR: data.priceInINR,
      inStock: data.inStock ?? 0,
      images: { create: data.images?.map((i: any) => ({ url: i.url, alt: i.alt })) || [] },
    },
    include: { images: true },
  });
  return NextResponse.json(prod, { status: 201 });
}
```

---
### `POST /api/checkout` (`src/app/api/checkout/route.ts`)

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { form, cart, total } = await req.json();

  // Basic server validation
  if (!cart || !Object.keys(cart).length) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  // Fetch products and confirm totals
  const ids = Object.keys(cart);
  const products = await prisma.product.findMany({ where: { id: { in: ids } } });
  const prodMap = Object.fromEntries(products.map((p) => [p.id, p]));
  let computed = 0;
  const items = [] as any[];
  for (const id of ids) {
    const p = prodMap[id];
    if (!p) continue;
    const qty = cart[id].qty;
    computed += p.priceInINR * qty;
    items.push({ productId: id, quantity: qty, priceInINR: p.priceInINR });
  }
  if (computed !== total) {
    // trust server value
    console.warn("Cart total mismatch", { client: total, server: computed });
  }

  const order = await prisma.order.create({
    data: {
      totalInINR: computed,
      status: "PENDING",
      address: form.address,
      items: { create: items },
    },
    include: { items: true },
  });

  return NextResponse.json({ ok: true, orderId: order.id });
}
```

---
## Tailwind Config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@shadcn/ui/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        gametosa: {
          sky: '#00BFFF',
          mid: '#1E90FF',
          royal: '#4169E1',
        },
      },
    },
  },
  plugins: [],
};
```

---
## next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["bcrypt"],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // allow remote images during dev
    ],
  },
};

export default nextConfig;
```

---
## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["node"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---
## .gitignore

```gitignore
# dependencies
/node_modules

# output
/.next
/out

# env
auth.json
.env*

# prisma
prisma/dev.db
prisma/dev.db-journal
```

---
## Minimal Gametosa SVG Logo (`public/gametosa-logo.svg`)

```svg
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="24" fill="#000"/>
  <path d="M32 64C32 44.1178 48.1178 28 68 28C87.8822 28 104 44.1178 104 64C104 83.8822 87.8822 100 68 100H52" stroke="url(#g)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="g" x1="32" y1="28" x2="104" y2="100" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00BFFF"/>
      <stop offset="0.5" stop-color="#1E90FF"/>
      <stop offset="1" stop-color="#4169E1"/>
    </linearGradient>
  </defs>
</svg>
```

---
