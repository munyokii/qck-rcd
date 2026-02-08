import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/db";
import { CompanyProfileSchema } from "@/app/lib/schemas/company";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: true },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({company: user.company });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = CompanyProfileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, kraPin, phone, email, website, physicalAddress } = result.data;

    const logoUrl = body.logoUrl || null

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const company = await prisma.company.upsert({
      where: { userId: user.id },
      update: {
        name,
        kraPin,
        phone,
        email,
        website,
        physicalAddress,
        logoUrl
      },
      create: {
        userId: user.id,
        name,
        kraPin,
        phone,
        email,
        website,
        physicalAddress,
        logoUrl
      },
    });

    return NextResponse.json({ success: true, company });
  } catch (error) {
    console.error("Company Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}