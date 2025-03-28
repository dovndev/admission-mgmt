import React from "react";

interface Footer {
  bg?: string;
  text?: string;
}

const Footer: React.FC<Footer> = ({ bg = "gray", text = "" }) => {
  let contacts = [
    { name: "John", number: "1234567890" },
    { name: "Doe", number: "1234567890" },
  ];
  return (
    <footer
      className={`bg-${bg} text-${text} text-[10px] md:text-[13px] font-mono w-full slide_up shadow-lg shadow-foreground ${bg==="black"?"shadow-white":""}`}
    >
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-1">
              Muthoot Institute of Technology and Science <br />
              Varikoli P.O, Puthencruz- 682308 <br />
              PH: 0484-2732111/100
            </div>
            <div className="flex flex-col gap-1">
              <span>Contact Us</span>
              {contacts.map((contact) => (
                <p className="flex gap-2" key={contact.name}>
                  <span>{contact.name} : </span>
                  <span>{contact.number}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t-1 border-gray-300">
            <p>© 2025 Muthoot. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
