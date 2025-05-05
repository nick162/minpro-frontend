"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Ticket } from "@/types/ticket";
import { useCreateTransaction } from "@/hooks/api/transaction/useCreateTransaction";
import { useAuthStore } from "@/store/auth";

interface EventDetailBodyProps {
  event: {
    id: number;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    time?: string;
    description?: string;
    host?: string;
    tickets?: Ticket[];
  };
}

const EventDetailBody: React.FC<EventDetailBodyProps> = ({ event }) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const router = useRouter();
  const { createTransaction, loading, error } = useCreateTransaction();

  // ✅ Ambil user secara eksplisit
  const user = useAuthStore((state) => state.user);

  const handleCheckout = async () => {
    if (!selectedTicket || !user) return;

    const payload = {
      userId: user.id,
      eventId: event.id,
      ticketId: selectedTicket.id,
      quantity: 1,
    };

    const transactionId = await createTransaction(payload);
    if (transactionId) {
      router.push(`/transaction/${transactionId}`);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="relative bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full bg-zinc-800 p-1 rounded-xl grid grid-cols-2 text-white">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card className="mt-4 bg-zinc-900 border border-zinc-700 text-white p-4">
                <CardContent className="text-sm space-y-2">
                  <p className="whitespace-pre-wrap">
                    {event.description || "Deskripsi belum tersedia."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets">
              <div className="space-y-4 mt-4">
                {event.tickets?.length ? (
                  event.tickets.map(
                    (ticket) => (
                      console.log("entenet", ticket),
                      (
                        <Card
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket)}
                          className={`cursor-pointer transition bg-zinc-900 border ${
                            selectedTicket?.id === ticket.id
                              ? "border-orange-500 ring-1 ring-orange-400"
                              : "border-zinc-700"
                          }`}
                        >
                          <CardContent className="p-4 flex justify-between items-center text-white">
                            <div>
                              <p className="font-semibold">
                                {ticket.ticketType}
                              </p>
                              <p className="text-xs text-gray-400">
                                {ticket.availableSeats > 0
                                  ? `${ticket.availableSeats} kursi tersedia`
                                  : "Sold Out"}
                              </p>
                            </div>
                            <p className="font-bold text-orange-400">
                              Rp{ticket.price.toLocaleString("id-ID")}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    )
                  )
                ) : (
                  <p>Belum ada tiket tersedia.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card className="bg-zinc-900 border border-zinc-700 p-4 space-y-2 text-white">
            <h1 className="text-xl font-bold">{event.title}</h1>
            <p>📍 {event.location}</p>
            <p>
              📅 {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </p>
            {event.time && <p>⏰ {event.time}</p>}
            {event.host && (
              <div className="flex items-center gap-2 pt-2">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <p className="font-medium">{event.host}</p>
              </div>
            )}
          </Card>

          <Card className="bg-zinc-900 border border-zinc-700 p-4 space-y-4 text-white">
            {selectedTicket ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Tiket dipilih:{" "}
                  <span className="font-semibold text-white">
                    {selectedTicket.ticketType}
                  </span>
                </p>
                <div className="flex justify-between">
                  <p className="text-white font-semibold">Total price</p>
                  <p className="text-orange-400 font-bold">
                    Rp{selectedTicket.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Checkout"}
                </Button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </>
            ) : (
              <>
                <p className="text-sm text-orange-400">
                  Pilih tiket terlebih dahulu.
                </p>
                <div className="flex justify-between text-white">
                  <p>Total price</p>
                  <p className="font-bold">Rp 0</p>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled
                >
                  Checkout
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetailBody;
