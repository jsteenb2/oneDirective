class Row < ApplicationRecord
  belongs_to :project
  has_many :components
end
