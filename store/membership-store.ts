"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface Preference {
  dietary?: string;
  alcoholPreference?: string;
}

export interface MemberDetails {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  type: string;
  memberSince: string;
  validUntil: string;
  preferredLocation?: string;
  preferences?: Preference;
  bio?: string;
  user_type?: "tourist" | "local" | "staff";
  home_area?: string;
  interests?: string[];
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  location: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
}

interface MembershipState {
  memberDetails: MemberDetails;
  upcomingReservations: Reservation[];
  pastReservations: Reservation[];
  updateMemberDetails: (details: Partial<MemberDetails>) => void;
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (id: string) => void;
}

// Mock data
const mockMemberDetails: MemberDetails = {
  id: "MEM123456",
  name: "旅人太郎",
  email: "john.doe@example.com",
  phone: "+1 555-123-4567",
  avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
  type: "Platinum",
  memberSince: "2023年1月",
  validUntil: "2025年12月31日",
  preferredLocation: "lake_toya",
  preferences: {
    dietary: "none",
    alcoholPreference: "craft_beer"
  },
  bio: "クラフトビールとキャンプが好きです。北海道の自然を満喫しに来ました！",
  user_type: "tourist",
  home_area: "東京都",
  interests: ["camping", "gourmet", "onsen"],
};

// Mock reservations
const mockUpcomingReservations: Reservation[] = [
  {
    id: "R12345",
    date: "2025-06-15",
    time: "8:00 PM",
    guests: 2,
    location: "Main Bar",
    status: "confirmed"
  },
  {
    id: "R12346",
    date: "2025-07-10",
    time: "9:30 PM",
    guests: 4,
    location: "Private Lounge",
    status: "pending"
  }
];

const mockPastReservations: Reservation[] = [
  {
    id: "R12343",
    date: "2025-05-05",
    time: "7:30 PM",
    guests: 2,
    location: "Terrace",
    status: "completed"
  },
  {
    id: "R12344",
    date: "2025-04-20",
    time: "8:30 PM",
    guests: 6,
    location: "VIP Room",
    status: "completed"
  },
  {
    id: "R12342",
    date: "2025-03-15",
    time: "9:00 PM",
    guests: 2,
    location: "Main Bar",
    status: "cancelled"
  }
];

// Create store
export const useMembershipStore = create<MembershipState>()(
  persist(
    (set) => ({
      memberDetails: mockMemberDetails,
      upcomingReservations: mockUpcomingReservations,
      pastReservations: mockPastReservations,
      
      updateMemberDetails: (details) => 
        set((state) => ({ 
          memberDetails: { ...state.memberDetails, ...details }
        })),
      
      addReservation: (reservation) => 
        set((state) => ({
          upcomingReservations: [...state.upcomingReservations, reservation]
        })),
      
      cancelReservation: (id) => 
        set((state) => {
          const reservation = state.upcomingReservations.find(r => r.id === id);
          if (!reservation) return state;
          
          const updatedReservation = { ...reservation, status: "cancelled" as const };
          
          return {
            upcomingReservations: state.upcomingReservations.filter(r => r.id !== id),
            pastReservations: [...state.pastReservations, updatedReservation]
          };
        }),
    }),
    {
      name: "membership-storage",
    }
  )
);