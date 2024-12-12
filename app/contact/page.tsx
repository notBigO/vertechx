import { FiInstagram } from "react-icons/fi";
import { TbMapPinFilled } from "react-icons/tb";

const contactData = [
  {
    title: "Chief Coordinators",
    contacts: [
      { name: "Kiran Choudhari", phone: "+917411971510" },
      {
        name: "Ganesh Krishna",
        phone: "+918050740534",
      },
    ],
  },
  {
    title: "Core Team Handling",
    contacts: [
      { name: "Joel Thomas", phone: "+918310819628" },
      { name: "Kshama", phone: "+919019171207" },
      { name: "Nisar Ahamad", phone: "+919019164344" },
      { name: "Harshith", phone: "+919035791789" },
      { name: "Sudeeksha R", phone: "+916361267796" },
      { name: "Saqeefa Rizwan", phone: "+918951860250" },
      { name: "Manogna M Gowda", phone: "+919900787208" },
      { name: "Devdan Cornelius", phone: "+919731959458" },
    ],
  },
  {
    title: "Registrations",
    contacts: [
      { name: "Sharat", phone: "+919380897991" },
      { name: "Vishnupriya", phone: "+919679513003" },
    ],
  },
  {
    title: "Hackathon related queries",
    contacts: [
      {
        name: "Greeshma",
        phone: "+917483494661",
      },
      {
        name: "Heerath",
        phone: "+919797243748",
      },
    ],
  },
  {
    title: "Event Related Queries",
    contacts: [
      { name: "Priya", phone: "+916360424161" },
      { name: "Saniya", phone: "+916363357424" },
    ],
  },
  {
    title: "Website Support",
    contacts: [
      { name: "Siva", phone: "+919741319192" },
      { name: "Varun", phone: "+919980133790" },
    ],
  },

  {
    title: "Faculty Co-ordinator",
    contacts: [{ name: "Hameem I Shanavas", phone: "+919620659690" }],
  },
];

const Contact = () => {
  return (
    <section className="min-h-screen snap-start shrink-0 z-10 py-10 font-satoshi px-4 md:px-20">
      <div className="flex flex-col items-start justify-center w-full mt-8"></div>
      <article className="flex items-center justify-center mt-6">
        <div className="flex flex-col justify-center w-full gap-10 bg-white bg-opacity-5 backdrop-blur-sm border h-full border-gray-700 rounded-lg p-6 md:p-14">
          <div className="text-left text-white text-5xl font-medium mb-9">
            <span className="text-4xl">Contact us</span>
          </div>
          <div className="flex flex-col items-center justify-center text-left w-full text-xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {contactData.map((section, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 text-center bg-black/60 rounded-lg"
                >
                  <h3 className="text-xl font-medium text-white underline decoration-primary top-0">
                    {section.title}:
                  </h3>
                  {section.contacts.map((contact, i) => (
                    <p key={i} className="mt-2 text-white">
                      {contact.name} -{" "}
                      <a
                        href={`tel:${contact.phone}`}
                        className="underline font-bold text-primary hover:text-secondary"
                      >
                        {contact.phone}
                      </a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-left w-full text-xl">
            <div className="flex flex-row justify-center items-center gap-6 py-3">
              <div className="group">
                <a
                  href="https://www.instagram.com/vertechx?igsh=NTdpZTZ0amNmMHR4.com"
                  target="_blank"
                  className="flex justify-center items-center gap-4 text-white ls"
                >
                  <FiInstagram size={30} />
                </a>
              </div>
              <div className="h-6 w-px bg-white"></div>
              <div className="group">
                <a
                  target="_blank"
                  href="https://www.google.com/maps/place/MVJ+College+of+Engineering/@12.984114,77.7599852,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae0e0ddee6891b:0xbde773e8a7f7189d!8m2!3d12.984114!4d77.7621739"
                  className="flex justify-center items-center gap-4 text-white ls group cursor-pointer"
                >
                  <TbMapPinFilled size={45} />
                </a>
              </div>
            </div>
            <p className="text-primary font-semibold text-lg">
              VertechX 2024 | Tech In Momentum
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contact;
