import React from "react";

export const CONTACTS = [
  { name: "John", number: "1234567890" },
  { name: "Doe", number: "1234567890" },
];
export default function Contact({ className = "" }: { className?: string }) {
  return (
    <div className={`lg:fixed bottom-1 left-1 p-4 text-[13px] slide_up ${className}`}>
      {/* <div className="flex flex-col gap-1">
                  Muthoot Institute of Technology and Science <br />
                  Varikoli P.O, Puthencruz- 682308 <br />
                  PH: 0484-2732111/100
                </div> */}
      <div className="flex flex-col gap-1 items-end">
        <span className="text-muthootRed font-bold">Technical Support</span>
        <div className="grid grid-cols-[max-content_auto] gap-2">
          {CONTACTS.map((contact) => (
            <React.Fragment key={contact.name}>
              <span>{contact.name} :</span>
              <span className="font-bold">{contact.number}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
