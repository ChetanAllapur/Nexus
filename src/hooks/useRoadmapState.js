import { useMemo, useState, useEffect } from "react";
import { STACK_ORDER } from "../constants/roadmap";
import { SCHEDULE } from "../data/schedule";

export function useRoadmapState() {
  const [mainTab, setMainTab] = useState(() => {
    return parseInt(localStorage.getItem("nexus_main_tab")) || 0;
  });
  const [activeStack, setActiveStack] = useState(STACK_ORDER[0]);
  const [activeMonth, setActiveMonth] = useState(0);
  const [openWeeks, setOpenWeeks] = useState(() => {
    const saved = localStorage.getItem("nexus_open_weeks");
    return saved ? JSON.parse(saved) : { 1: true };
  });

  useEffect(() => {
    localStorage.setItem("nexus_main_tab", mainTab.toString());
  }, [mainTab]);

  useEffect(() => {
    localStorage.setItem("nexus_open_weeks", JSON.stringify(openWeeks));
  }, [openWeeks]);

  const filteredSchedule = useMemo(() => {
    if (activeMonth === 0) {
      return SCHEDULE;
    }

    return SCHEDULE.filter((week) => week.month === activeMonth);
  }, [activeMonth]);

  const toggleWeek = (weekNumber) => {
    setOpenWeeks((previous) => ({
      ...previous,
      [weekNumber]: !previous[weekNumber],
    }));
  };

  return {
    activeMonth,
    activeStack,
    filteredSchedule,
    mainTab,
    openWeeks,
    setActiveMonth,
    setActiveStack,
    setMainTab,
    toggleWeek,
  };
}
