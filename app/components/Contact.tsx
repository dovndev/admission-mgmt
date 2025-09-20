import React from "react";

export const CONTACTS = [
    { name: "Ms. Jeena Varghese", number: "9946652762" },
    { name: "Ms. Rija Jose", number: "6309387606" },
];
export default function Contact({ className = "" }: { className?: string }) {
    return (
        <div className={`lg:fixed bottom-1 left-1 p-4 text-[13px] slide_up ${className}`}>
            <div className="flex flex-col gap-1 items-start">
                <span className="text-muthootRed font-bold">Technical Support</span>
                <div className="grid  gap-2">
                    {CONTACTS.map((contact) => (
                        <React.Fragment key={contact.name}>
                            <div>
                                <span>{contact.name} : </span>
                                <span className="font-bold">{contact.number}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
