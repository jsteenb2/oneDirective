class CreateRows < ActiveRecord::Migration[5.0]
  def change
    create_table :rows do |t|
      t.integer :order
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
