class Project < ApplicationRecord
  # Wait for Devise setup.
  # belongs_to :user
  has_many :rows
end
