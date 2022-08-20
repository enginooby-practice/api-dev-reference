class Task < ApplicationRecord
  enum status: {
    NotStarted: "Not started",
    InProgress: "In progress",
    Completed: "Completed",
  }
end
