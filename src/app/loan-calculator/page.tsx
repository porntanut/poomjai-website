import type { Metadata } from "next";
import LoanCalculator from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "คำนวณผ่อนบ้าน",
  description:
    "คำนวณยอดผ่อนบ้านต่อเดือน ดอกเบี้ย 2 ช่วง ตารางผ่อนรายงวด และรายได้ขั้นต่ำที่ควรมีก่อนยื่นกู้ พร้อมทีมภูมิใจนิเวศน์ให้คำปรึกษาเรื่องสินเชื่อ",
  alternates: { canonical: "/loan-calculator" },
};

export default function LoanCalculatorPage() {
  return <LoanCalculator />;
}
