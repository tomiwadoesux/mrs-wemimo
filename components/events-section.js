"use client";

import { CalendarIcon, LocationIcon, MailIcon } from "./icons";

export function EventsSection() {
  const events = [
    {
      title: "Viewing",
      location: "African Evangelical Baptist Church",
      date: "Saturday, January 31, 2026",
      time: "10:00 AM",
      address: "770 E. Warrior Trail, Grand Prairie, TX 75052",
      note: "Viewing will be at the Church from 10:00-10:30 AM prior to funeral service.",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=770+E.+Warrior+Trail+Grand+Prairie+TX+75052",
    },
    {
      title: "Funeral Service",
      location: "African Evangelical Baptist Church",
      date: "Saturday, January 31, 2026",
      time: "10:30 AM",
      address: "770 E. Warrior Trail, Grand Prairie, TX 75052",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=770+E.+Warrior+Trail+Grand+Prairie+TX+75052",
    },
    {
      title: "Graveside Service",
      location: "Skyvue Memorial Gardens",
      date: "Saturday, January 31, 2026",
      time: "1:00 PM",
      address: "7220 Rendon Bloodworth Road, Mansfield, TX 76063",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=7220+Rendon+Bloodworth+Road+Mansfield+TX+76063",
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">
            Service Details
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Celebration of Life
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <h3 className="font-serif text-2xl text-foreground mb-6 pb-4 border-b border-border group-hover:border-secondary/20 transition-colors">
                {event.title}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg shrink-0">
                    <LocationIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      {event.location}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg shrink-0">
                    <CalendarIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      {event.date}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {event.time}
                    </p>
                  </div>
                </div>

                {event.note && (
                  <p className="text-sm text-secondary bg-secondary/5 p-3 rounded-lg italic">
                    {event.note}
                  </p>
                )}

                <div className="pt-4">
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full gap-2 bg-foreground text-background py-3 rounded-lg font-medium text-sm hover:bg-secondary hover:text-white transition-colors uppercase tracking-wider"
                  >
                    <LocationIcon className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
