from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

app = Flask(__name__)
CORS(app)


@app.route('/categories', methods=['GET'])
def get_categories():
    base_url = 'https://rntgroup.com'
    url = f'{base_url}/career/vacancies/'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    category_buttons = soup.find_all(
        'div', class_='tab-button theme-bg theme-border')
    categories = [{
        'name': button.get_text(strip=True),
        'dataTarget': button['data-target-tab']
    } for button in category_buttons]

    return jsonify(categories)


@app.route('/vacancies', methods=['GET'])
def get_vacancies():
    base_url = 'https://rntgroup.com'
    url = f'{base_url}/career/vacancies/'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    vacancies = soup.find_all('div', class_='tariff-btn_wrapper')
    descriptions = soup.find_all('div', class_='theme-ul')

    data = []

    for vacancy, description in zip(vacancies, descriptions):
        titleHref = vacancy.find('a', class_='btn btn-transparent')
        if titleHref:
            title = titleHref['data-subject']
            relative_link = titleHref['href']
            link = urljoin(base_url, relative_link)

            description_items = [li.text.strip()
                                 for li in description.find_all('li')]
            description_text = "\n".join(description_items)

            data.append({
                'title': title,
                'description': description_text,
                'link': link
            })

    return jsonify(data)


@app.route('/vacancies_by_category', methods=['GET'])
def get_vacancies_by_category():
    category_id = request.args.get('category_id')
    if not category_id:
        return jsonify({'error': 'Category ID is required'}), 400

    base_url = 'https://rntgroup.com'
    url = f'{base_url}/career/vacancies/'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    vacancies = soup.find_all('div', attrs={'data-tab-id': category_id})
    data = []

    for vacancy in vacancies:
        titleHref = vacancy.find_all('a', class_='btn btn-transparent')
        description_div = vacancy.find_all('div', class_='theme-ul')
        for titleHrefI, description in zip(titleHref, description_div):
            title = titleHrefI['data-subject']
            relative_link = titleHrefI.get('href', '#')
            link = urljoin(base_url, relative_link)

            description_items = [li.text.strip()
                                 for li in description.find_all('li')]
            description_text = "\n".join(description_items)
            
            data.append({
                'title': title,
                'description': description_text,
                'link': link
            })

    return jsonify(data)


@app.route('/vacancy_detail', methods=['GET'])
def get_vacancy_detail():
    link = request.args.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400

    detailed_description = get_detailed_description(link)
    if not detailed_description:
        return jsonify({'error': 'Failed to fetch detailed description'}), 500

    return jsonify(detailed_description)


def get_detailed_description(link):
    try:
        response = requests.get(link)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching detailed description: {e}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    job_title = soup.find('h1', class_='block-title-text').get_text(strip=True)
    tasks = soup.find('div', class_='block-desc-col').find_all('li')
    required_skills = soup.find_all(
        'div', class_='block-desc-col')[1].find_all('li')
    preferred_skills = soup.find_all(
        'div', class_='block-desc-col')[2].find_all('li')
    contact_info = soup.find_all('div', class_='block-desc-col')[-1]

    we_offer = soup.find_all('div', class_='service-info-wrap')
    services = []
    for service in we_offer:
        service_name = service.find(
            'div', class_='service-name block-el-title')
        service_desc = service.find('div', class_='service-desc')

        if service_name and service_desc:
            services.append({
                'name': service_name.get_text(strip=True),
                'description': service_desc.get_text(strip=True)
            })

    data = {
        'job_title': job_title,
        'tasks': [task.get_text(strip=True) for task in tasks],
        'required_skills': [skill.get_text(strip=True) for skill in required_skills],
        'preferred_skills': [skill.get_text(strip=True) for skill in preferred_skills],
        'contact_info': contact_info.get_text(strip=True, separator='\n'),
        'we_offer': services
    }

    return data


if __name__ == '__main__':
    app.run(debug=True)
