class Project < ApplicationRecord

  belongs_to :user
  has_many :rows, dependent: :destroy
  has_many :components, through: :rows, dependent: :destroy

  accepts_nested_attributes_for :rows
  accepts_nested_attributes_for :components
end
