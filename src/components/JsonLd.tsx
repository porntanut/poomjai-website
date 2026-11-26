// ใส่ข้อมูลแบบ JSON-LD ให้ Google และ AI อ่านเข้าใจง่าย
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
