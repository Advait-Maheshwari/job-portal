export const config = {
  "slug": "job-portal",
  "title": "Job Portal",
  "brand": "CareerBridge",
  "description": "Publish job opportunities and manage their hiring status.",
  "entity": "Job Posting",
  "entityPlural": "jobs",
  "resource": "jobs",
  "primaryField": "jobTitle",
  "secondaryField": "companyName",
  "categoryField": "jobType",
  "numericField": "salary",
  "numericFormat": "currency",
  "fields": [
    {
      "name": "jobTitle",
      "label": "Job title",
      "placeholder": "Java Developer",
      "type": "text",
      "minLength": 2,
      "maxLength": 120
    },
    {
      "name": "companyName",
      "label": "Company",
      "placeholder": "Northstar Labs",
      "type": "text",
      "minLength": 2,
      "maxLength": 120
    },
    {
      "name": "jobType",
      "label": "Job type",
      "options": [
        "Full-time",
        "Part-time",
        "Internship",
        "Contract"
      ],
      "type": "select"
    },
    {
      "name": "salary",
      "label": "Annual salary",
      "type": "number",
      "step": "0.01",
      "min": 0
    },
    {
      "name": "status",
      "label": "Status",
      "type": "select",
      "options": [
        "Draft",
        "Open",
        "Paused",
        "Closed"
      ]
    }
  ],
  "statuses": [
    "Draft",
    "Open",
    "Paused",
    "Closed"
  ],
  "colors": {
    "primary": "#0369a1",
    "primaryDark": "#075985",
    "sidebar": "#143b52"
  }
};
