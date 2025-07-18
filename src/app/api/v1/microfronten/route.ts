import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "Mock microfrontend endpoint",
    microfrontends: []
  });
}
