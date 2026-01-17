"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface Property {
  id: string;
  displayName: string;
}

interface PropertySelectorProps {
  properties: Property[];
  currentPropertyId?: string;
}

export function PropertySelector({
  properties,
  currentPropertyId,
}: PropertySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePropertyChange = (propertyId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("propertyId", propertyId);
    router.push(`/dashboard?${params.toString()}`);
  };

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center gap-3">
      <label htmlFor="property-select" className="text-sm font-medium text-slate-400">
        Property:
      </label>
      <div className="relative">
        <select
          id="property-select"
          value={currentPropertyId || properties[0]?.id || ""}
          onChange={(e) => handlePropertyChange(e.target.value)}
          className="appearance-none rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 pr-8 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700/50 hover:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 cursor-pointer shadow-sm"
        >
          {properties.map((property) => (
            <option key={property.id} value={property.id} className="bg-slate-800">
              {property.displayName}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

