export const questionsData = [
    {
        category: "Project Identity",
        questions: [
            {
                id: "projectName",
                label: "Project Name",
                type: "text",
                placeholder: "e.g., Apollo Release"
            },
            {
                id: "mission",
                label: "Mission / Goal",
                type: "textarea",
                placeholder: "To build a..."
            }
        ]
    },
    {
        category: "Team Logistics",
        questions: [
            {
                id: "sprintDuration",
                label: "Sprint Duration",
                type: "select",
                options: ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks", "Kanban (No Sprints)"]
            },
            {
                id: "coreHours",
                label: "Core Hours",
                type: "time-range"
            },
            {
                id: "commTools",
                label: "Communication Tools",
                type: "multi-select",
                options: ["Slack", "Microsoft Teams", "Discord", "Zoom", "Google Meet"]
            }
        ]
    },
    {
        category: "Team Composition",
        questions: [
            {
                id: "members",
                label: "Team Members",
                addLabel: "+ Add Member",
                type: "structured-list",
                fields: [
                    { name: "name", label: "Name", type: "text", width: "30%", placeholder: "Name" },
                    { name: "role", label: "Role", type: "select", options: ["Frontend", "Backend", "Fullstack", "Designer", "PM", "EM", "QA", "SRE", "Other"], width: "30%" },
                    { name: "focus", label: "Main Focus / Skill", type: "text", width: "40%", placeholder: "e.g. React, API, etc." }
                ]
            },
            {
                id: "stakeholders",
                label: "Stakeholders",
                addLabel: "+ Add Stakeholder",
                type: "structured-list",
                fields: [
                    { name: "name", label: "Name", type: "text", width: "40%", placeholder: "Name" },
                    { name: "title", label: "Title / Relationship", type: "text", width: "60%", placeholder: "e.g. Sponsor, Client" }
                ]
            }
        ]
    },
    {
        category: "Meetings",
        questions: [
            {
                id: "standupTime",
                label: "Daily Standup Time",
                type: "time"
            },
            {
                id: "planningDay",
                label: "Sprint Planning Day",
                type: "select",
                options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            },
            {
                id: "customMeetings",
                label: "Other Meetings",
                type: "structured-list",
                fields: [
                    { name: "name", label: "Meeting Name", type: "text", width: "30%", placeholder: "e.g., Retro" },
                    { name: "frequency", label: "Freq", type: "select", options: ["Weekly", "Bi-weekly", "Monthly", "Daily"], width: "20%" },
                    { name: "day", label: "Day", type: "select", options: ["Mon", "Tue", "Wed", "Thu", "Fri", "-"], width: "15%" },
                    { name: "time", label: "Time", type: "time", width: "20%" }
                ]
            }
        ]
    },
    {
        category: "Rules",
        questions: [
            {
                id: "codereview",
                label: "Code Review Policy",
                type: "select",
                options: ["1 Approval Required", "2 Approvals Required", "No Review Required"]
            },
            {
                id: "estimation",
                label: "Estimation Method",
                type: "select",
                options: ["Story Points (Fibonacci)", "Hours", "T-Shirt Sizes", "No Estimation"]
            }
        ]
    }
];
