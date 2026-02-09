/**
 * Training Templates Seed Data
 *
 * This file contains 5 curated training programs that will be seeded as public templates.
 * Each template includes detailed weekly schedules with exercises, duration, and intensity.
 */

import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { trainingProgramTemplates } from "../../drizzle/schema";

export const TRAINING_TEMPLATES = [
  {
    name: "General Conditioning",
    description:
      "A comprehensive 4-week program designed to build overall fitness, stamina, and muscle tone. Perfect for horses returning to work after a break or building a foundation for more advanced training.",
    duration: 4,
    discipline: "general",
    level: "beginner",
    goals:
      "Build cardiovascular fitness, develop muscle tone, establish consistent work routine, improve suppleness and flexibility",
    isPublic: true,
    programData: JSON.stringify({
      weeks: [
        {
          week: 1,
          focus: "Gentle introduction to regular work",
          sessions: [
            {
              day: "Monday",
              type: "Walk",
              duration: 30,
              description:
                "Relaxed walk work focusing on rhythm and forward movement. Include 5-10 minutes on varied terrain.",
              intensity: "low",
            },
            {
              day: "Tuesday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Free turnout or light hand walking",
              intensity: "none",
            },
            {
              day: "Wednesday",
              type: "Walk/Trot",
              duration: 35,
              description:
                "20 mins walk, 3-5 mins trot in short intervals (2 mins trot, 2 mins walk)",
              intensity: "low",
            },
            {
              day: "Thursday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Free turnout",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Walk",
              duration: 35,
              description:
                "Relaxed walk including hills if available. Focus on forward movement.",
              intensity: "low",
            },
            {
              day: "Saturday",
              type: "Walk/Trot",
              duration: 40,
              description:
                "25 mins walk, 5-8 mins trot work. Gradually increase trot intervals.",
              intensity: "low",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest day",
              intensity: "none",
            },
          ],
        },
        {
          week: 2,
          focus: "Increase trot work and introduce basic exercises",
          sessions: [
            {
              day: "Monday",
              type: "Walk/Trot",
              duration: 40,
              description:
                "20 mins walk, 10 mins trot including large circles and changes of direction",
              intensity: "low-moderate",
            },
            {
              day: "Tuesday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Free turnout or hand walking",
              intensity: "none",
            },
            {
              day: "Wednesday",
              type: "Walk/Trot",
              duration: 45,
              description:
                "Warm up 15 mins walk, 15 mins trot work with transitions, cool down 15 mins walk",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Walk Only",
              duration: 30,
              description: "Recovery walk - relaxed and stretchy",
              intensity: "low",
            },
            {
              day: "Friday",
              type: "Walk/Trot",
              duration: 45,
              description:
                "Include serpentines and figure-8s at walk and trot. Focus on bend and balance.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Walk/Trot",
              duration: 50,
              description:
                "Longer trot sessions (5 mins at a time). Include walking breaks between.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest day",
              intensity: "none",
            },
          ],
        },
        {
          week: 3,
          focus: "Build stamina and introduce canter work",
          sessions: [
            {
              day: "Monday",
              type: "Walk/Trot/Canter",
              duration: 45,
              description:
                "15 mins walk, 20 mins trot, introduce 2-3 mins of canter in short bursts",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Walk Only",
              duration: 30,
              description: "Recovery walk on loose rein",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Walk/Trot",
              duration: 50,
              description:
                "Flatwork session focusing on transitions and rhythm. No canter.",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Free turnout",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Walk/Trot/Canter",
              duration: 50,
              description:
                "Balanced work in all three gaits. Include 5 mins canter total.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Walk/Trot",
              duration: 55,
              description:
                "Longer trot session focusing on rhythm and impulsion. Include lateral work if ready.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest day",
              intensity: "none",
            },
          ],
        },
        {
          week: 4,
          focus: "Consolidate fitness and prepare for advanced work",
          sessions: [
            {
              day: "Monday",
              type: "All Gaits",
              duration: 50,
              description:
                "Balanced workout: 15 mins walk, 20 mins trot, 10 mins canter (in intervals)",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Walk/Trot",
              duration: 40,
              description:
                "Active recovery: Relaxed but forward walk and trot work",
              intensity: "low-moderate",
            },
            {
              day: "Wednesday",
              type: "All Gaits",
              duration: 55,
              description:
                "Full flatwork session including lateral work and transitions between all gaits",
              intensity: "moderate-high",
            },
            {
              day: "Thursday",
              type: "Walk Only",
              duration: 30,
              description: "Easy walk for recovery",
              intensity: "low",
            },
            {
              day: "Friday",
              type: "All Gaits",
              duration: 60,
              description:
                "Longer work session. Test fitness with extended trot and canter work.",
              intensity: "moderate-high",
            },
            {
              day: "Saturday",
              type: "Trail/Hack",
              duration: 45,
              description:
                "Relaxing trail ride at walk and trot. Include hills if available.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest day - well earned!",
              intensity: "none",
            },
          ],
        },
      ],
    }),
  },
  {
    name: "Flatwork Fundamentals",
    description:
      "A 4-week program focused on developing correct basic dressage movements, improving balance, rhythm, and the horse's way of going. Suitable for horses with basic fitness.",
    duration: 4,
    discipline: "dressage",
    level: "intermediate",
    goals:
      "Establish correct bend and flexion, improve balance and self-carriage, develop accurate transitions, introduce lateral movements",
    isPublic: true,
    programData: JSON.stringify({
      weeks: [
        {
          week: 1,
          focus: "Establish rhythm and relaxation",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 45,
              description:
                "Focus on rhythm at all gaits. Large 20m circles. Practice halt-walk-trot transitions.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Light Hack",
              duration: 30,
              description: "Relaxing trail ride to maintain forward thinking",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Flatwork",
              duration: 50,
              description:
                "Work on straightness on long sides. Introduce 15m circles. Begin leg yielding on diagonal.",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Rest/Light Lunge",
              duration: 20,
              description:
                "Light lunging or free turnout. Keep horse moving but not stressed.",
              intensity: "low",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 45,
              description:
                "Serpentines (3-4 loops). Practice walk-trot-walk transitions focusing on balance.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Flatwork",
              duration: 50,
              description:
                "Introduce shoulder-in at walk. Continue circles and transitions work.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 2,
          focus: "Develop suppleness and bend",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 50,
              description:
                "Circles and voltes (10m at walk, 15m at trot). Focus on inside leg to outside rein.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Gymnastic",
              duration: 40,
              description:
                "Ground poles and cavaletti work to improve rhythm and balance",
              intensity: "moderate",
            },
            {
              day: "Wednesday",
              type: "Flatwork",
              duration: 50,
              description:
                "Leg yield both directions. Shoulder-in on long sides at walk and trot.",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Light Work",
              duration: 30,
              description: "Walk work only - stretching and relaxation",
              intensity: "low",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 50,
              description:
                "Figure-8s with simple changes through walk. Focus on balance in transitions.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Flatwork",
              duration: 55,
              description:
                "Counter-canter on large circles (20m). Introduction only if horse is ready.",
              intensity: "moderate-high",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 3,
          focus: "Improve collection and self-carriage",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 50,
              description:
                "Transitions within gaits (working to medium to working trot). Develop impulsion.",
              intensity: "moderate-high",
            },
            {
              day: "Tuesday",
              type: "Trail/Hack",
              duration: 35,
              description: "Relaxing trail ride to keep horse fresh mentally",
              intensity: "low-moderate",
            },
            {
              day: "Wednesday",
              type: "Flatwork",
              duration: 55,
              description:
                "Haunches-in at walk. Continue shoulder-in at trot. Work on throughness.",
              intensity: "moderate-high",
            },
            {
              day: "Thursday",
              type: "Gymnastic",
              duration: 40,
              description:
                "Raised cavaletti and small grids to improve engagement",
              intensity: "moderate",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 50,
              description:
                "Half-pass at walk. Collect and extend at trot. Focus on maintaining rhythm.",
              intensity: "moderate-high",
            },
            {
              day: "Saturday",
              type: "Dressage Test",
              duration: 45,
              description:
                "Practice riding through a simple dressage test (Intro or Training level)",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 4,
          focus: "Refinement and consolidation",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 55,
              description:
                "Full repertoire of lateral work. Test suppleness and response to aids.",
              intensity: "moderate-high",
            },
            {
              day: "Tuesday",
              type: "Light Work",
              duration: 30,
              description: "Easy walk and stretchy trot for recovery",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Flatwork",
              duration: 55,
              description:
                "Focus on weak areas identified. Refine transitions and accuracy.",
              intensity: "moderate-high",
            },
            {
              day: "Thursday",
              type: "Gymnastic",
              duration: 40,
              description:
                "Cavaletti work at trot and canter to maintain engagement",
              intensity: "moderate",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 60,
              description:
                "Complete dressage-style workout. Assess progress from week 1.",
              intensity: "moderate-high",
            },
            {
              day: "Saturday",
              type: "Test Ride",
              duration: 50,
              description:
                "Ride complete dressage test. Focus on accuracy and quality of gaits.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest - celebrate your progress!",
              intensity: "none",
            },
          ],
        },
      ],
    }),
  },
  {
    name: "Jumping Basics",
    description:
      "A progressive 4-week program introducing horses to jumping or improving basic jumping technique. Starts with ground poles and builds to small fences with proper approach and landing.",
    duration: 4,
    discipline: "jumping",
    level: "intermediate",
    goals:
      "Build confidence over fences, develop correct approach and getaway, improve balance and rhythm, establish straightness",
    isPublic: true,
    programData: JSON.stringify({
      weeks: [
        {
          week: 1,
          focus: "Ground poles and rhythm",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 40,
              description:
                "Establish forward rhythm and balance. Focus on canter quality.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Ground Poles",
              duration: 45,
              description:
                "Walk and trot over single ground poles. Focus on maintaining rhythm.",
              intensity: "low-moderate",
            },
            {
              day: "Wednesday",
              type: "Rest/Hack",
              duration: 30,
              description: "Light trail ride to stay fresh",
              intensity: "low",
            },
            {
              day: "Thursday",
              type: "Ground Poles",
              duration: 45,
              description:
                "Trot pole grid (4-5 poles at 1.3m spacing). Add one pole at canter.",
              intensity: "moderate",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 40,
              description:
                "Canter work - circles, transitions, maintain balance",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Cavaletti",
              duration: 45,
              description:
                "Raised cavaletti (15-20cm) at trot. Introduce canter over single raised pole.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 2,
          focus: "Introduction to small fences",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 40,
              description:
                "Canter quality work. Practice upward and downward transitions.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Cross Rails",
              duration: 45,
              description:
                "Introduce cross rails (40-50cm). Focus on straight approach and center of fence.",
              intensity: "moderate",
            },
            {
              day: "Wednesday",
              type: "Light Work",
              duration: 30,
              description: "Walk and trot only for recovery",
              intensity: "low",
            },
            {
              day: "Thursday",
              type: "Small Fences",
              duration: 50,
              description:
                "Cross rails and small verticals (50-60cm). Practice from both directions.",
              intensity: "moderate",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 40,
              description:
                "Circles and transitions to maintain balance and rhythm",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Jumping",
              duration: 50,
              description:
                "Small course of 4-5 fences (cross rails and verticals 50-60cm)",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 3,
          focus: "Build confidence and technique",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 40,
              description:
                "Quality canter work. Establish good rhythm and balance.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Grids",
              duration: 50,
              description:
                "Simple gymnastic grid: cross rail to small vertical (1 stride). Height 60cm.",
              intensity: "moderate",
            },
            {
              day: "Wednesday",
              type: "Hack",
              duration: 35,
              description: "Trail ride to keep horse relaxed and happy",
              intensity: "low-moderate",
            },
            {
              day: "Thursday",
              type: "Jumping",
              duration: 50,
              description:
                "Verticals and small oxers (60-70cm). Focus on straightness and rhythm.",
              intensity: "moderate",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 40,
              description: "Canter transitions and balance work",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Course Work",
              duration: 55,
              description:
                "Small course of 6-8 fences including turns. Height 60-70cm.",
              intensity: "moderate-high",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 4,
          focus: "Consolidate and increase height slightly",
          sessions: [
            {
              day: "Monday",
              type: "Flatwork",
              duration: 45,
              description:
                "Quality schooling session. Prepare for jumping with good basics.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Grid Work",
              duration: 50,
              description:
                "More complex gymnastic: bounce to 1-stride. Verticals and small oxers 70cm.",
              intensity: "moderate-high",
            },
            {
              day: "Wednesday",
              type: "Rest/Walk",
              duration: 30,
              description: "Easy walk for recovery",
              intensity: "low",
            },
            {
              day: "Thursday",
              type: "Jumping",
              duration: 50,
              description:
                "Related distances work. 2-stride and 3-stride combinations at 70-80cm.",
              intensity: "moderate-high",
            },
            {
              day: "Friday",
              type: "Flatwork",
              duration: 40,
              description: "Polish basics - transitions and balance",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Course",
              duration: 55,
              description:
                "Final course: 8-10 fences at 70-80cm. Include variety of fences and turns.",
              intensity: "moderate-high",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest - well done!",
              intensity: "none",
            },
          ],
        },
      ],
    }),
  },
  {
    name: "Endurance Training",
    description:
      "A comprehensive 6-week program designed to build cardiovascular fitness and stamina for long-distance riding. Includes interval training, LSD (Long Slow Distance) work, and heart rate management.",
    duration: 6,
    discipline: "endurance",
    level: "advanced",
    goals:
      "Develop cardiovascular fitness, build muscle stamina, teach proper pacing, improve recovery times, prepare for competitive endurance",
    isPublic: true,
    programData: JSON.stringify({
      weeks: [
        {
          week: 1,
          focus: "Base fitness assessment and LSD introduction",
          sessions: [
            {
              day: "Monday",
              type: "LSD (Long Slow Distance)",
              duration: 60,
              description:
                "Steady walk and slow trot. Monitor heart rate (target: 100-120 bpm). Include hills if available.",
              intensity: "low-moderate",
            },
            {
              day: "Tuesday",
              type: "Recovery Walk",
              duration: 30,
              description: "Easy walk on loose rein",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Interval Training",
              duration: 45,
              description:
                "5 min warm-up, then 5x (3 min trot, 2 min walk), 5 min cool-down. Monitor recovery.",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Free turnout or hand walking",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Steady Work",
              duration: 50,
              description:
                "Mix of walk and trot. Maintain consistent pace. Heart rate 100-130 bpm.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "LSD",
              duration: 75,
              description:
                "Longer slow distance work. Mostly trot with walking breaks. Build stamina.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 2,
          focus: "Increase duration and introduce faster work",
          sessions: [
            {
              day: "Monday",
              type: "LSD",
              duration: 70,
              description:
                "Steady pace work. Mix of trot and canter. Heart rate 110-130 bpm.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Recovery",
              duration: 30,
              description: "Walk only for active recovery",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Hill Work",
              duration: 50,
              description:
                "Find hills! Walk up, trot down (carefully). Builds muscle and fitness.",
              intensity: "moderate-high",
            },
            {
              day: "Thursday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Interval Training",
              duration: 50,
              description:
                "6x (4 min trot/canter, 2 min walk). Check recovery rate after each interval.",
              intensity: "moderate-high",
            },
            {
              day: "Saturday",
              type: "LSD",
              duration: 90,
              description:
                "Long ride at steady pace. Practice pacing. Include varied terrain.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 3,
          focus: "Build endurance capacity",
          sessions: [
            {
              day: "Monday",
              type: "Steady State",
              duration: 60,
              description:
                "Maintain heart rate 120-140 bpm. Mix of trot and canter.",
              intensity: "moderate-high",
            },
            {
              day: "Tuesday",
              type: "Recovery Walk",
              duration: 35,
              description: "Long walk on varied terrain",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Speed Work",
              duration: 45,
              description:
                "5x (2 min faster canter, 3 min trot). Monitor heart rate recovery.",
              intensity: "high",
            },
            {
              day: "Thursday",
              type: "Rest/Light Turnout",
              duration: 0,
              description: "Rest or very light hand walking",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Hill Intervals",
              duration: 55,
              description:
                "Hill repeats: 4-5 climbs at trot/canter. Walk down for recovery.",
              intensity: "high",
            },
            {
              day: "Saturday",
              type: "LSD",
              duration: 100,
              description:
                "Extended long ride. Practice nutrition/water stops. Steady pace throughout.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 4,
          focus: "Peak fitness building",
          sessions: [
            {
              day: "Monday",
              type: "Tempo Work",
              duration: 60,
              description:
                "Sustained effort at 130-150 bpm. Mix of trot and canter on good going.",
              intensity: "high",
            },
            {
              day: "Tuesday",
              type: "Recovery",
              duration: 30,
              description: "Easy walk for active recovery",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Interval Training",
              duration: 50,
              description:
                "7x (3 min hard work, 2 min recovery). Check pulse recovery to 100 bpm.",
              intensity: "high",
            },
            {
              day: "Thursday",
              type: "Rest",
              duration: 0,
              description: "Complete rest - very important!",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Steady Work",
              duration: 65,
              description:
                "Moderate pace work. Focus on rhythm and efficiency.",
              intensity: "moderate-high",
            },
            {
              day: "Saturday",
              type: "LSD",
              duration: 120,
              description:
                "Long endurance ride. Practice competition pace. Include vet check stops.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 5,
          focus: "Competition preparation",
          sessions: [
            {
              day: "Monday",
              type: "Competition Pace",
              duration: 70,
              description:
                "Ride at target competition pace. Monitor all metrics.",
              intensity: "high",
            },
            {
              day: "Tuesday",
              type: "Recovery Walk",
              duration: 40,
              description: "Long walk to aid recovery",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Speed Intervals",
              duration: 50,
              description:
                "Short, sharp intervals at race pace. 6x (1.5 min fast, 2.5 min recover).",
              intensity: "high",
            },
            {
              day: "Thursday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Moderate Work",
              duration: 55,
              description: "Steady work to maintain fitness. No stress.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Mock Competition",
              duration: 90,
              description:
                "Simulate competition: ride target distance at pace, include vet check practice.",
              intensity: "moderate-high",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest",
              intensity: "none",
            },
          ],
        },
        {
          week: 6,
          focus: "Taper and maintain",
          sessions: [
            {
              day: "Monday",
              type: "Moderate Work",
              duration: 50,
              description:
                "Reduce intensity. Maintain fitness but allow recovery.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Walk",
              duration: 30,
              description: "Easy walk",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Light Intervals",
              duration: 40,
              description:
                "4x (2 min moderate, 2 min walk). Keep systems sharp but not stressful.",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Rest",
              duration: 0,
              description: "Rest",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Easy Hack",
              duration: 35,
              description: "Relaxed trail ride. Stay loose and happy.",
              intensity: "low-moderate",
            },
            {
              day: "Saturday",
              type: "Final Prep",
              duration: 45,
              description:
                "Light workout if competing soon, or LSD if maintaining. Judge based on next goal.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest - you're ready!",
              intensity: "none",
            },
          ],
        },
      ],
    }),
  },
  {
    name: "Rehabilitation Return-to-Work",
    description:
      "A careful 4-week program for horses returning to work after injury or extended time off. Emphasizes gradual progression, monitoring for discomfort, and building confidence.",
    duration: 4,
    discipline: "general",
    level: "beginner",
    goals:
      "Safely return to work, rebuild fitness gradually, monitor for any pain or discomfort, rebuild confidence in horse and rider, establish baseline for future work",
    isPublic: true,
    programData: JSON.stringify({
      weeks: [
        {
          week: 1,
          focus: "Very gentle reintroduction to work",
          sessions: [
            {
              day: "Monday",
              type: "Hand Walking",
              duration: 20,
              description:
                "Start with in-hand walking. Straight lines only. Observe movement carefully.",
              intensity: "very low",
            },
            {
              day: "Tuesday",
              type: "Rest/Turnout",
              duration: 0,
              description:
                "Controlled turnout in small area. Observe for any stiffness or lameness.",
              intensity: "none",
            },
            {
              day: "Wednesday",
              type: "Hand Walking",
              duration: 25,
              description:
                "Increase duration slightly. Include gentle slopes if cleared by vet.",
              intensity: "very low",
            },
            {
              day: "Thursday",
              type: "Rest",
              duration: 0,
              description: "Complete rest. Monitor for any heat/swelling.",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Hand Walking",
              duration: 30,
              description:
                "Longer walk. Can include gentle curves if movement is sound.",
              intensity: "very low",
            },
            {
              day: "Saturday",
              type: "Light Ridden Walk",
              duration: 15,
              description:
                "First ridden work if all good. Walk only on flat, good surface. STOP if any concerns.",
              intensity: "very low",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description:
                "Rest day. Check thoroughly for any adverse reactions.",
              intensity: "none",
            },
          ],
        },
        {
          week: 2,
          focus: "Build confidence with walk work",
          sessions: [
            {
              day: "Monday",
              type: "Ridden Walk",
              duration: 20,
              description:
                "Relaxed walk on good footing. Straight lines and large gentle curves.",
              intensity: "low",
            },
            {
              day: "Tuesday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Controlled turnout. Continue monitoring.",
              intensity: "none",
            },
            {
              day: "Wednesday",
              type: "Ridden Walk",
              duration: 25,
              description:
                "Increase duration. Can add gentle transitions (halt to walk).",
              intensity: "low",
            },
            {
              day: "Thursday",
              type: "Hand Walking",
              duration: 20,
              description: "In-hand work as active recovery and bonding time.",
              intensity: "very low",
            },
            {
              day: "Friday",
              type: "Ridden Walk",
              duration: 30,
              description:
                "Longer walk work. Include variety in route if all going well.",
              intensity: "low",
            },
            {
              day: "Saturday",
              type: "Ridden Walk + Brief Trot",
              duration: 35,
              description:
                "Mostly walk, but introduce 2-3 x 30 seconds of SLOW trot if vet-approved and horse comfortable.",
              intensity: "low",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Complete rest. Thorough evaluation.",
              intensity: "none",
            },
          ],
        },
        {
          week: 3,
          focus: "Gradually introduce trot work",
          sessions: [
            {
              day: "Monday",
              type: "Walk/Trot",
              duration: 30,
              description:
                "Warm up 15 mins walk, then 3-4 x 1 minute slow trot with walk breaks between.",
              intensity: "low",
            },
            {
              day: "Tuesday",
              type: "Walk Only",
              duration: 25,
              description: "Recovery walk day. Keep horse moving but easy.",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Walk/Trot",
              duration: 35,
              description:
                "Increase trot duration: 4-5 x 2 minutes trot with walk breaks.",
              intensity: "low-moderate",
            },
            {
              day: "Thursday",
              type: "Rest",
              duration: 0,
              description: "Complete rest. Check for soundness.",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Walk/Trot",
              duration: 40,
              description:
                "Continue building: 15 mins walk warm-up, 15 mins trot work (in intervals), 10 mins walk cool-down.",
              intensity: "low-moderate",
            },
            {
              day: "Saturday",
              type: "Light Trail",
              duration: 35,
              description:
                "Easy trail ride at walk and trot. Varied terrain (within reason) is therapeutic.",
              intensity: "low-moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description: "Rest and evaluate progress.",
              intensity: "none",
            },
          ],
        },
        {
          week: 4,
          focus: "Consolidate and prepare for normal work",
          sessions: [
            {
              day: "Monday",
              type: "Walk/Trot",
              duration: 40,
              description:
                "Balanced walk and trot work. Can introduce large circles and gentle bending.",
              intensity: "moderate",
            },
            {
              day: "Tuesday",
              type: "Walk Only",
              duration: 30,
              description: "Active recovery walk session.",
              intensity: "low",
            },
            {
              day: "Wednesday",
              type: "Walk/Trot",
              duration: 45,
              description:
                "Increase work duration. Include transitions and simple figures if comfortable.",
              intensity: "moderate",
            },
            {
              day: "Thursday",
              type: "Rest/Turnout",
              duration: 0,
              description: "Rest with turnout",
              intensity: "none",
            },
            {
              day: "Friday",
              type: "Walk/Trot/Brief Canter",
              duration: 45,
              description:
                "If vet-approved and horse sound: introduce 2-3 x 1 minute gentle canter on good surface.",
              intensity: "moderate",
            },
            {
              day: "Saturday",
              type: "Varied Work",
              duration: 50,
              description:
                "Mix of gaits, exercises, and terrain. Assess readiness for next phase of training.",
              intensity: "moderate",
            },
            {
              day: "Sunday",
              type: "Rest",
              duration: 0,
              description:
                "Final rest of program. Complete assessment. If all good, ready for normal training!",
              intensity: "none",
            },
          ],
        },
      ],
      notes:
        "IMPORTANT: This program assumes veterinary clearance has been given for return to work. Stop immediately if horse shows any signs of lameness, heat, swelling, or discomfort. Always err on the side of caution. Adjust timeline based on individual horse's response and vet recommendations.",
    }),
  },
];

/**
 * Seed training templates into the database
 * This function is idempotent - it will only insert templates that don't already exist
 */
export async function seedTrainingTemplates() {
  const db = await getDb();
  if (!db) {
    console.error("❌ Database connection failed");
    return;
  }

  console.log("🌱 Seeding training templates...");

  let insertedCount = 0;
  let skippedCount = 0;

  for (const template of TRAINING_TEMPLATES) {
    try {
      // Check if template with this name already exists (for any user)
      const existing = await db
        .select()
        .from(trainingProgramTemplates)
        .where(eq(trainingProgramTemplates.name, template.name))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⏭️  Skipped: "${template.name}" (already exists)`);
        skippedCount++;
        continue;
      }

      // Insert template with userId 1 (admin/system user)
      await db.insert(trainingProgramTemplates).values({
        ...template,
        userId: 1, // System/admin user
      });

      console.log(`✅ Created: "${template.name}"`);
      insertedCount++;
    } catch (error: any) {
      console.error(`❌ Error creating "${template.name}":`, error.message);
    }
  }

  console.log(`\n✨ Seeding complete!`);
  console.log(`   Inserted: ${insertedCount}`);
  console.log(`   Skipped: ${skippedCount}`);
  console.log(`   Total: ${TRAINING_TEMPLATES.length}`);
}

// Allow running this script directly
if (require.main === module) {
  seedTrainingTemplates()
    .then(() => {
      console.log("\n✅ Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Error:", error);
      process.exit(1);
    });
}
