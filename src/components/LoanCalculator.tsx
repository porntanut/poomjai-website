"use client";

import { useState } from "react";

// สัดส่วนภาระหนี้ต่อรายได้ (DSR) ที่ธนาคารไทยมักใช้ประมาณ 40%
const DSR = 0.4;

const fmt = (n: number) =>
  Number.isFinite(n) ? Math.round(n).toLocaleString("th-TH") : "-";

function Field({
  label,
  unit,
  value,
  onChange,
  step = 1,
  hint,
  paired = false,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  hint?: string;
  paired?: boolean;
}) {
  // paired = อยู่คู่กับอีกช่องในแถวเดียวกัน → ใช้ subgrid ให้ชื่อช่อง/ช่องกรอก/คำอธิบาย ตรงกันทุกแถว
  return (
    <label className={paired ? "grid grid-rows-subgrid row-span-3 min-w-0" : "block"}>
      <span className="self-end text-sm font-normal leading-snug text-slate-green">{label}</span>
      <div className="mt-1 flex min-w-0 items-center rounded-xl border border-sage-light bg-white focus-within:border-forest">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full min-w-0 rounded-xl bg-transparent px-3 sm:px-4 py-3 text-lg font-normal outline-none"
        />
        <span className="pr-3 sm:pr-4 text-xs sm:text-sm text-slate-green whitespace-nowrap">{unit}</span>
      </div>
      {hint && <span className="mt-1 block text-xs text-slate-green">{hint}</span>}
    </label>
  );
}

// โปรแกรมคำนวณผ่อนบ้าน (ย้ายมาจากโปรเจกต์ loan-calculator)
export default function LoanCalculator() {
  const [price, setPrice] = useState(2500000);
  const [down, setDown] = useState(250000);
  const [rate1, setRate1] = useState(3);
  const [rate2, setRate2] = useState(6);
  const [years, setYears] = useState(30);
  const [age, setAge] = useState(30);

  const loan = Math.max((price || 0) - (down || 0), 0);
  const n = Math.round((years || 0) * 12);
  const r1 = (rate1 || 0) / 100 / 12;
  const r2 = (rate2 || 0) / 100 / 12;

  // ค่างวดแบบผ่อนเท่ากันทุกเดือน
  const pmt = (p: number, r: number, months: number) =>
    months <= 0 ? NaN : r === 0 ? p / months : (p * r) / (1 - Math.pow(1 + r, -months));

  // ช่วงที่ 1: 3 ปีแรก (36 งวด) คิดค่างวดจากดอกเบี้ยช่วงแรก ผ่อนให้หมดภายในระยะเวลาทั้งหมด
  const n1 = Math.min(36, n);
  const monthly1 = pmt(loan, r1, n);
  // เงินต้นคงเหลือหลังผ่อนครบ 3 ปี
  const balance =
    r1 === 0
      ? loan - monthly1 * n1
      : loan * Math.pow(1 + r1, n1) - (monthly1 * (Math.pow(1 + r1, n1) - 1)) / r1;
  // ช่วงที่ 2: ปีที่เหลือ คิดค่างวดใหม่จากเงินต้นคงเหลือ ด้วยดอกเบี้ยช่วงหลัง
  const n2 = n - n1;
  const monthly2 = n2 > 0 ? pmt(Math.max(balance, 0), r2, n2) : NaN;

  const maxMonthly = n2 > 0 ? Math.max(monthly1, monthly2) : monthly1;
  const minIncome = maxMonthly / DSR;
  const totalPaid = monthly1 * n1 + (n2 > 0 ? monthly2 * n2 : 0);
  const totalInterest = totalPaid - loan;
  const downPct = price > 0 ? ((down || 0) / price) * 100 : 0;

  // อายุตอนผ่อนงวดสุดท้าย (ธนาคารไทยส่วนใหญ่ให้ผ่อนจบไม่เกินอายุ 65–70 ปี)
  const startAge = Math.floor(age || 0);
  const endAge = startAge + Math.ceil(n / 12);
  const MAX_AGE = 70;

  // ตารางผ่อนรายเดือน แล้วจัดกลุ่มเป็นรายปี (ตามอายุผู้กู้)
  type Row = { no: number; pay: number; interest: number; principal: number; balance: number };
  const yearsTable: { year: number; age: number; rows: Row[] }[] = [];
  if (n > 0 && n <= 600 && Number.isFinite(monthly1)) {
    let bal = loan;
    for (let i = 1; i <= n; i++) {
      const rate = i <= n1 ? r1 : r2;
      const interest = bal * rate;
      let pay = i <= n1 ? monthly1 : monthly2;
      if (i === n) pay = bal + interest; // งวดสุดท้ายปิดยอดที่เหลือพอดี
      const principal = pay - interest;
      bal = Math.max(bal - principal, 0);
      const y = Math.floor((i - 1) / 12);
      if (!yearsTable[y]) yearsTable[y] = { year: y + 1, age: startAge + y, rows: [] };
      yearsTable[y].rows.push({ no: i, pay, interest, principal, balance: bal });
    }
  }
  const sum = (rows: Row[], k: "pay" | "interest" | "principal") =>
    rows.reduce((s, r) => s + r[k], 0);

  return (
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl md:text-4xl text-forest">
          คำนวณผ่อนบ้าน
        </h1>
        <p className="mt-2 text-slate-green">
          ใส่ราคาบ้านและเงื่อนไขสินเชื่อ เพื่อดูยอดผ่อนต่อเดือน และรายได้ที่ควรมีก่อนยื่นกู้
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-sage-light/50 p-6 space-y-5">
            <Field label="ราคาบ้าน" unit="บาท" value={price} onChange={setPrice} step={10000} />
            <Field
              label="เงินดาวน์"
              unit="บาท"
              value={down}
              onChange={setDown}
              step={10000}
              hint={`คิดเป็น ${downPct.toFixed(1)}% ของราคาบ้าน`}
            />
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4">
              <Field paired label="ดอกเบี้ย 3 ปีแรก (เฉลี่ย)" unit="% ต่อปี" value={rate1} onChange={setRate1} step={0.1} />
              <Field paired label="ดอกเบี้ยปีที่เหลือ" unit="% ต่อปี" value={rate2} onChange={setRate2} step={0.1} />
            </div>
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4">
              <Field paired label="ระยะเวลาผ่อน" unit="ปี" value={years} onChange={setYears} hint="ส่วนใหญ่ไม่เกิน 30–40 ปี" />
              <Field
                paired
                label="อายุผู้กู้ (ปัจจุบัน)"
                unit="ปี"
                value={age}
                onChange={setAge}
                hint={n > 0 && startAge > 0 ? `ผ่อนจบตอนอายุประมาณ ${endAge} ปี` : undefined}
              />
            </div>
            {startAge > 0 && endAge > MAX_AGE && (
              <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                ⚠️ ผ่อนจบตอนอายุ {endAge} ปี เกินกว่าที่ธนาคารส่วนใหญ่รับ (ประมาณ {MAX_AGE} ปี)
                ลองลดระยะเวลาผ่อนเหลือไม่เกิน {Math.max(MAX_AGE - startAge, 0)} ปี
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-forest p-6 text-white flex flex-col">
            <p className="text-sm text-sage-light">ยอดผ่อนต่อเดือน (โดยประมาณ)</p>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-sage-light">3 ปีแรก ({n1} งวด)</p>
                <p className="text-2xl sm:text-4xl font-semibold text-cream whitespace-nowrap">
                  {fmt(monthly1)} <span className="text-base font-light text-white">บาท</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-sage-light">ปีที่เหลือ ({n2} งวด)</p>
                <p className="text-2xl sm:text-4xl font-semibold text-cream whitespace-nowrap">
                  {n2 > 0 ? fmt(monthly2) : "-"}{" "}
                  <span className="text-base font-light text-white">บาท</span>
                </p>
              </div>
            </div>

            <div className="gold-line my-6 w-24" />

            <p className="text-sm text-sage-light">รายได้ขั้นต่ำที่ธนาคารน่าจะอนุมัติ</p>
            <p className="mt-1 text-3xl font-semibold text-white">
              {fmt(minIncome)} <span className="text-lg font-light">บาท/เดือน</span>
            </p>
            <p className="mt-1 text-xs text-sage-light">
              คิดจากยอดผ่อนช่วงที่สูงกว่า ให้ไม่เกิน {DSR * 100}% ของรายได้ต่อเดือน (รวมหนี้อื่นที่มีอยู่แล้ว)
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-sage-light">ยอดกู้</dt>
                <dd className="text-lg font-normal">{fmt(loan)} บาท</dd>
              </div>
              <div>
                <dt className="text-sage-light">ผ่อนทั้งหมด</dt>
                <dd className="text-lg font-normal">{n} งวด</dd>
              </div>
              <div>
                <dt className="text-sage-light">ดอกเบี้ยรวม</dt>
                <dd className="text-lg font-normal">{fmt(totalInterest)} บาท</dd>
              </div>
              <div>
                <dt className="text-sage-light">ยอดชำระรวม</dt>
                <dd className="text-lg font-normal">{fmt(totalPaid)} บาท</dd>
              </div>
            </dl>
          </div>
        </div>

        {yearsTable.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-forest">ตารางผ่อนรายงวด</h2>
            <p className="mt-1 text-sm text-slate-green">
              แยกตามปีและอายุผู้กู้ · กดที่แต่ละปีเพื่อดูยอดผ่อนทุกเดือน
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-sage-light bg-white">
              <div className="hidden sm:grid grid-cols-6 gap-2 bg-sage-light/50 px-4 py-3 text-xs font-normal text-slate-green">
                <span>ปีที่ / อายุ</span>
                <span className="text-right">ผ่อนต่อเดือน</span>
                <span className="text-right">ผ่อนรวมทั้งปี</span>
                <span className="text-right">ตัดเงินต้น</span>
                <span className="text-right">ดอกเบี้ย</span>
                <span className="text-right">เงินต้นคงเหลือ</span>
              </div>

              {yearsTable.map((y) => {
                const last = y.rows[y.rows.length - 1];
                const over = y.age >= MAX_AGE;
                return (
                  <details key={y.year} className="group border-t border-sage-light first:border-t-0">
                    <summary className="grid cursor-pointer list-none grid-cols-2 sm:grid-cols-6 gap-2 px-4 py-3 text-sm hover:bg-sage-light/30">
                      <span className="font-normal text-forest">
                        <span className="inline-block w-4 transition-transform group-open:rotate-90">›</span>
                        ปีที่ {y.year} · อายุ{" "}
                        <span className={over ? "text-red-600" : ""}>{y.age} ปี</span>
                      </span>
                      <span className="text-right">{fmt(y.rows[0].pay)} บาท</span>
                      <span className="hidden sm:block text-right">{fmt(sum(y.rows, "pay"))}</span>
                      <span className="hidden sm:block text-right">{fmt(sum(y.rows, "principal"))}</span>
                      <span className="hidden sm:block text-right">{fmt(sum(y.rows, "interest"))}</span>
                      <span className="hidden sm:block text-right">{fmt(last.balance)}</span>
                    </summary>

                    <div className="overflow-x-auto bg-cream/30 px-4 pb-4">
                      <table className="w-full min-w-[480px] text-sm">
                        <thead>
                          <tr className="text-xs text-slate-green">
                            <th className="py-2 text-left font-normal">งวดที่</th>
                            <th className="py-2 text-right font-normal">ค่างวด</th>
                            <th className="py-2 text-right font-normal">ตัดเงินต้น</th>
                            <th className="py-2 text-right font-normal">ดอกเบี้ย</th>
                            <th className="py-2 text-right font-normal">เงินต้นคงเหลือ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {y.rows.map((r) => (
                            <tr key={r.no} className="border-t border-sage-light/60">
                              <td className="py-1.5">{r.no}</td>
                              <td className="py-1.5 text-right">{fmt(r.pay)}</td>
                              <td className="py-1.5 text-right">{fmt(r.principal)}</td>
                              <td className="py-1.5 text-right">{fmt(r.interest)}</td>
                              <td className="py-1.5 text-right">{fmt(r.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-sage-light bg-white p-6 text-sm text-slate-green space-y-2">
          <p>
            * ผลการคำนวณเป็นการประมาณเบื้องต้น แบ่งดอกเบี้ยเป็น 2 ช่วง (3 ปีแรก และปีที่เหลือ)
            เมื่อเข้าสู่ช่วงที่ 2 จะคำนวณค่างวดใหม่จากเงินต้นคงเหลือ
            ยอดจริงขึ้นอยู่กับโปรโมชันดอกเบี้ยของแต่ละธนาคาร
          </p>
          <p className="font-normal text-forest">ผลอนุมัติขึ้นอยู่กับธนาคาร</p>
          <p>
            ภูมิใจนิเวศน์ยินดีให้คำปรึกษาเรื่องสินเชื่อ และช่วยเตรียมความพร้อมก่อนยื่นกู้ 🏡
            <br />
            📞 02-819-7977 · 090-898-4549 · 💬 LINE: @poomjainivate
          </p>
        </div>
      </section>
  );
}
