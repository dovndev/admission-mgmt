export const CONTACTS = [
  { name: "John", number: "1234567890" },
  { name: "Doe", number: "1234567890" },
];
export default function Contact(){

  return (
      <div className="absolute top-16 p-4 text-[10px] md:text-[13px] font-mono w-full slide_up">
            {/* <div className="flex flex-col gap-1">
              Muthoot Institute of Technology and Science <br />
              Varikoli P.O, Puthencruz- 682308 <br />
              PH: 0484-2732111/100
            </div> */}
            <div className="flex flex-col gap-1 items-end">
              <span className="text-muthootRed font-bold">Technical Support</span>
              {CONTACTS.map((contact) => (
                <p className="flex gap-2" key={contact.name}>
                  <span>{contact.name} : </span>
                  <span className="font-bold">{contact.number}</span>
                </p>
              ))}
                  </div>
      </div>
  );
};
