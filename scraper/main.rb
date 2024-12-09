require 'bundler'
Bundler.require

require 'date'

def login!(page)
  puts 'Open login page'
  page.goto('https://www.thisismymk.com/th/login')

  puts 'Fill username & password'
  page.fill('#username', ENV.fetch('MK_USERNAME', 'foo'))
  page.fill('#password', ENV.fetch('MK_PASSWORD', 'bar'))

  puts 'Click login button'
  page.click('button[type=submit]')

  if page.query_selector('#loginFailed')
    puts 'ERROR: Login failed'
    exit 1
  end

  page.wait_for_load_state
end

def get_card_data(page)
  name = page.query_selector('.card-body h4').inner_text
  card_number, expire_date, today_points, redeemable_points = page.query_selector_all('.detail-profile .txt-red').map(&:inner_text).map(&:strip)
  acc_points = page.get_by_text("คะแนนปรับระดับสะสม").locator(".txt-red").first.inner_text

  raw_points_expire = page.get_by_text("วันหมดอายุ (คะแนนแลกของรางวัล)").locator(".ms-5").first.inner_text
  points_expire = raw_points_expire.scan(/\d+/)[0].to_i
  points_expire_date = Date.parse(raw_points_expire.scan(/\d{2}\/\d{2}\/\d{4}/)[0])

  {
    name:,
    card_number:,
    expire_date: Date.parse(expire_date),
    today_points: today_points.gsub(',', '').to_i,
    redeemable_points: redeemable_points.gsub(',', '').to_i,
    acc_points: acc_points.gsub(',', '').to_i,
    points_expire: points_expire,
    points_expire_date: points_expire_date,
  }
end

def write_to_file(card_data)
  data = card_data.merge(updated_at: DateTime.now.to_s)

  puts "Write to data.json: #{data}"

  File.write('data.json', JSON.pretty_generate(data))
end

Playwright.create(playwright_cli_executable_path: 'npx playwright') do |playwright|
  playwright.chromium.launch(headless: ENV.has_key?("CI")) do |browser|
    context = browser.new_context # Prepare new window.
    page = context.new_page # Open new window and new tab here. (about:blank)

    login!(page)
    card_data = get_card_data(page)

    write_to_file(card_data)
  end
end
